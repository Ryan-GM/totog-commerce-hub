
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
      
      console.log('Fetching order tracking for order:', orderId);
      
      // Since order_tracking table might not be in generated types yet, 
      // we'll use a direct query with proper error handling
      try {
        const { data, error } = await supabase
          .from('order_tracking' as any)
          .select('*')
          .eq('order_id', orderId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Order tracking query error:', error);
          // Return empty array if table doesn't exist yet or other errors
          return [];
        }
        
        console.log('Order tracking data:', data);
        // Safely cast the data to our expected type
        return Array.isArray(data) ? data as OrderTracking[] : [];
      } catch (err) {
        console.error('Order tracking fetch error:', err);
        return [];
      }
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
