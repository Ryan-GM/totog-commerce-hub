
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
      
      // Use raw SQL query since the table might not be in generated types yet
      const { data, error } = await supabase.rpc('get_order_tracking', {
        p_order_id: orderId,
        p_user_id: user.id
      });

      if (error) {
        // If RPC doesn't exist, fall back to direct query
        console.log('RPC not found, using direct query');
        const { data: directData, error: directError } = await supabase
          .from('order_tracking' as any)
          .select('*')
          .eq('order_id', orderId)
          .order('created_at', { ascending: true });

        if (directError) throw directError;
        return (directData || []) as OrderTracking[];
      }
      
      return (data || []) as OrderTracking[];
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
