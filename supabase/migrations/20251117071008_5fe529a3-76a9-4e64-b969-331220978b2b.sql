-- Create payment sessions table
CREATE TABLE public.payment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_address TEXT NOT NULL UNIQUE,
  amount DECIMAL(16, 8) NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT false,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (needed to check payment status)
CREATE POLICY "Anyone can read payment sessions"
ON public.payment_sessions
FOR SELECT
USING (true);

-- Create policy for inserting payment sessions
CREATE POLICY "Service role can insert payment sessions"
ON public.payment_sessions
FOR INSERT
WITH CHECK (true);

-- Create policy for updating payment sessions
CREATE POLICY "Service role can update payment sessions"
ON public.payment_sessions
FOR UPDATE
USING (true);

-- Create index on payment_address for faster lookups
CREATE INDEX idx_payment_sessions_address ON public.payment_sessions(payment_address);

-- Create index on paid status
CREATE INDEX idx_payment_sessions_paid ON public.payment_sessions(paid);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_payment_session_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payment_sessions_updated_at
BEFORE UPDATE ON public.payment_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_payment_session_updated_at();