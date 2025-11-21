// src/services/paymentService.ts
import { supabase } from '@/integrations/supabase/client';

export const createPaymentSession = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke('create-payment-session', {
    body: { amount },
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    }
  });

  if (error) throw error;
  return data;
};

export const checkPaymentStatus = async (sessionId: string) => {
  const { data, error } = await supabase.functions.invoke('check-payment', {
    body: { sessionId },
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    }
  });

  if (error) throw error;
  return data;
};