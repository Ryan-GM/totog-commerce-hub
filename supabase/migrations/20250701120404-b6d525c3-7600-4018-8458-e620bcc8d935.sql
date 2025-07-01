
-- Add missing columns to existing profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create wallet table for user balance and transactions
CREATE TABLE public.wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'purchase', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  payment_method TEXT,
  payment_reference TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on new tables
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wallets
CREATE POLICY "Users can view their own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own wallet" ON public.wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own wallet" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for wallet transactions
CREATE POLICY "Users can view their own transactions" ON public.wallet_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own transactions" ON public.wallet_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update the handle_new_user function to also create wallet
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  
  INSERT INTO public.wallets (user_id, balance)
  VALUES (new.id, 0.00)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at triggers for new tables
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallet_transactions_updated_at BEFORE UPDATE ON public.wallet_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX idx_wallet_transactions_user_id ON public.wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_wallet_id ON public.wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_type ON public.wallet_transactions(type);
CREATE INDEX idx_wallet_transactions_status ON public.wallet_transactions(status);
