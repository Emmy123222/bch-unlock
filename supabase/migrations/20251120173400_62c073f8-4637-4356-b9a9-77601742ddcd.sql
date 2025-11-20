-- Remove unique constraint on payment_address since all sessions use the same merchant address
ALTER TABLE public.payment_sessions
DROP CONSTRAINT IF EXISTS payment_sessions_payment_address_key;

-- Add session_key column to uniquely identify each payment session
ALTER TABLE public.payment_sessions
ADD COLUMN IF NOT EXISTS session_key TEXT UNIQUE DEFAULT gen_random_uuid()::text;

-- Enable realtime for admin dashboard updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.payment_sessions;