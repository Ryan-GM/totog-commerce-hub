
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface OrderTracking {
  id: string;
  order_id: string;
  status: 'order_placed' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  status_message: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  created_at: string;
  updated_at: string;
}

export const useOrderTracking = (orderId?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['order-tracking', orderId],
    queryFn: async () => {
      if (!user || !orderId) return [];
      
      const { data, error } = await supabase
        .from('order_tracking')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as OrderTracking[];
    },
    enabled: !!user && !!orderId,
  });
};

export const getStatusLabel = (status: string): string => {
  const statusLabels = {
    order_placed: 'Order Placed',
    processing: 'Processing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return statusLabels[status as keyof typeof statusLabels] || status;
};
