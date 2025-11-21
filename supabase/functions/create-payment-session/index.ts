// supabase/functions/create-payment-session/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  'Access-Control-Allow-Credentials': 'true'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { amount } = await req.json()
    if (!amount) {
      throw new Error('Amount is required')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Generate a unique payment ID
    const paymentId = crypto.randomUUID()
    
    // Get merchant address from environment variables
    const merchantAddress = Deno.env.get('MERCHANT_BCH_ADDRESS')
    if (!merchantAddress) {
      throw new Error('Merchant BCH address not configured')
    }

    // Create payment session in database
    const { data: session, error } = await supabaseClient
      .from('payment_sessions')
      .insert([{
        id: paymentId,
        amount: amount,
        status: 'pending',
        merchant_address: merchantAddress,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        paymentId,
        amount,
        merchantAddress,
        status: 'pending'
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )

  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 400
      }
    )
  }
})