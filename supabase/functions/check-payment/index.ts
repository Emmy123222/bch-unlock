import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Check BCH blockchain for transactions
const checkBCHTransaction = async (address: string, expectedAmount: number): Promise<boolean> => {
  try {
    // Remove 'bitcoincash:' prefix if present
    const cleanAddress = address.replace('bitcoincash:', '');
    
    // Use Bitcoin.com REST API to check for transactions
    // In production, you might want to use a dedicated BCH node
    const apiUrl = `https://rest.bitcoin.com/v2/address/details/${cleanAddress}`;
    
    console.log('Checking address:', cleanAddress);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error('API error:', response.status, await response.text());
      return false;
    }
    
    const data = await response.json();
    
    console.log('Address data:', JSON.stringify(data, null, 2));
    
    // Check if there are any transactions and if balance is sufficient
    // Note: In production, you'd want to check for specific transaction amounts
    // and confirmations, not just the total balance
    if (data.balance && parseFloat(data.balance) >= expectedAmount) {
      console.log('Payment confirmed! Balance:', data.balance);
      return true;
    }
    
    if (data.unconfirmedBalance && parseFloat(data.unconfirmedBalance) >= expectedAmount) {
      console.log('Payment detected (unconfirmed)! Balance:', data.unconfirmedBalance);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking BCH transaction:', error);
    return false;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();

    if (!address) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the payment session from database
    const { data: session, error: fetchError } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('payment_address', address)
      .single();

    if (fetchError || !session) {
      console.error('Session fetch error:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Payment session not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If already paid, return immediately
    if (session.paid) {
      return new Response(
        JSON.stringify({ paid: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check blockchain for payment
    const isPaid = await checkBCHTransaction(address, session.amount);

    // Update session if payment is confirmed
    if (isPaid) {
      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ paid: true })
        .eq('payment_address', address);

      if (updateError) {
        console.error('Failed to update session:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ 
        paid: isPaid,
        amount: session.amount,
        address: address,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in check-payment:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
