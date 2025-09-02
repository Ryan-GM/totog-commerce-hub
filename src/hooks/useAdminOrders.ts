import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AdminOrder {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string | null;
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  billing_address: any;
  shipping_address: any;
  created_at: string;
  updated_at: string;
  notes: string | null;
  order_items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    products: {
      id: string;
      name: string;
      images: string[];
    };
  }>;
  profiles?: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            quantity,
            unit_price,
            total_price,
            products (
              id,
              name,
              images
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get profile data separately for each order
      const ordersWithProfiles = await Promise.all(
        (data || []).map(async (order) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, email, first_name, last_name')
            .eq('id', order.user_id)
            .single();

          return {
            ...order,
            profiles: profile,
          };
        })
      );

      return ordersWithProfiles as AdminOrder[];
    },
  });
};

export const useAdminUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status, paymentStatus, trackingNumber }: { 
      orderId: string; 
      status?: string; 
      paymentStatus?: string;
      trackingNumber?: string;
    }) => {
      const updateData: any = {};
      if (status) updateData.status = status;
      if (paymentStatus) updateData.payment_status = paymentStatus;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      // If status changed, add tracking entry
      if (status) {
        const trackingData: any = {
          order_id: orderId,
          status,
          status_message: `Order status updated to ${status}`
        };

        if (trackingNumber) {
          trackingData.tracking_number = trackingNumber;
        }

        await supabase
          .from('order_tracking')
          .insert(trackingData);
      }

      // Invalidate both orders and tracking queries
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-tracking'] });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order updated",
        description: "Order status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    },
  });
};