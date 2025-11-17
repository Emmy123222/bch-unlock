import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Check BCH blockchain using multiple APIs for reliability
const checkBCHTransaction = async (address: string, expectedAmount: number): Promise<boolean> => {
  try {
    const cleanAddress = address.replace('bitcoincash:', '');
    console.log('Checking address:', cleanAddress, 'for amount:', expectedAmount, 'BCH');
    
    // Try multiple BCH APIs for redundancy
    const apis = [
      {
        name: 'Bitcoin.com REST API',
        check: async () => {
          const url = `https://rest.bitcoin.com/v2/address/details/${cleanAddress}`;
          const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!response.ok) return false;
          
          const data = await response.json();
          const balance = parseFloat(data.balance || '0');
          const unconfirmed = parseFloat(data.unconfirmedBalance || '0');
          const total = balance + unconfirmed;
          
          console.log(`Bitcoin.com - Balance: ${balance}, Unconfirmed: ${unconfirmed}`);
          return total >= expectedAmount;
        },
      },
      {
        name: 'FullStack.cash API',
        check: async () => {
          const url = `https://api.fullstack.cash/v5/electrumx/balance/${cleanAddress}`;
          const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!response.ok) return false;
          
          const data = await response.json();
          const confirmed = (data?.balance?.confirmed || 0) / 100000000; // satoshis to BCH
          const unconfirmed = (data?.balance?.unconfirmed || 0) / 100000000;
          const total = confirmed + unconfirmed;
          
          console.log(`FullStack.cash - Confirmed: ${confirmed}, Unconfirmed: ${unconfirmed}`);
          return total >= expectedAmount;
        },
      },
      {
        name: 'Transaction History Check',
        check: async () => {
          const url = `https://rest.bitcoin.com/v2/address/transactions/${cleanAddress}`;
          const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!response.ok) return false;
          
          const data = await response.json();
          if (!data.txs || data.txs.length === 0) return false;
          
          // Check recent transactions for expected amount
          for (const tx of data.txs) {
            if (tx.vout) {
              for (const output of tx.vout) {
                const value = parseFloat(output.value || '0');
                if (value >= expectedAmount) {
                  console.log(`Found matching tx: ${tx.txid} with value: ${value}`);
                  return true;
                }
              }
            }
          }
          return false;
        },
      },
    ];

    // Try each API
    for (const api of apis) {
      try {
        console.log(`Trying ${api.name}...`);
        const result = await api.check();
        if (result) {
          console.log(`✅ Payment confirmed via ${api.name}`);
          return true;
        }
      } catch (apiError) {
        console.error(`${api.name} error:`, apiError);
        continue;
      }
    }
    
    console.log('❌ No payment detected on any API');
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
        JSON.stringify({ 
          paid: true,
          message: 'Payment already confirmed',
          amount: session.amount,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check blockchain for payment using real APIs
    const isPaid = await checkBCHTransaction(address, session.amount);

    // Update session if payment is confirmed
    if (isPaid) {
      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ 
          paid: true,
          updated_at: new Date().toISOString(),
        })
        .eq('payment_address', address);

      if (updateError) {
        console.error('Failed to update session:', updateError);
      } else {
        console.log('✅ Payment session updated');
      }
    }

    return new Response(
      JSON.stringify({ 
        paid: isPaid,
        amount: session.amount,
        address: address,
        message: isPaid ? '🎉 Payment confirmed!' : 'Waiting for payment...',
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
