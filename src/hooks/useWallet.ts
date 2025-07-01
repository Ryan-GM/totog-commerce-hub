
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'refund';
  amount: number;
  description: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const useWallet = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['wallet', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Wallet;
    },
    enabled: !!user,
  });
};

export const useWalletTransactions = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['wallet-transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WalletTransaction[];
    },
    enabled: !!user,
  });
};

export const useCreateWalletTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (transactionData: Omit<WalletTransaction, 'id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('wallet_transactions')
        .insert(transactionData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
};
