
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

// Zod schema for order tracking validation
const OrderTrackingSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  status: z.enum(['order_placed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled']),
  status_message: z.string().nullable(),
  tracking_number: z.string().nullable(),
  estimated_delivery: z.string().nullable(),
  actual_delivery: z.string().nullable(),
  location: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type OrderTracking = z.infer<typeof OrderTrackingSchema>;

export const useOrderTracking = (orderId?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['order-tracking', orderId],
    queryFn: async () => {
      if (!user || !orderId) return [];
      
      console.log('Fetching order tracking for order:', orderId);
      
      const { data, error } = await supabase
        .from('order_tracking')
        .select(`
          id,
          order_id,
          status,
          status_message,
          tracking_number,
          estimated_delivery,
          actual_delivery,
          location,
          created_at,
          updated_at
        `)
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching order tracking:', error);
        throw error;
      }

      console.log('Order tracking data:', data);
      return data as OrderTracking[];
    },
    enabled: !!user && !!orderId,
  });
};

export const getStatusLabel = (status: string): string => {
  const statusLabels = {
    order_placed: 'Order Placed',
    processing: 'Processing',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return statusLabels[status as keyof typeof statusLabels] || status;
};
