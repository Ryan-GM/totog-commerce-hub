import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { OrderTracking } from './useOrderTracking';

export const useRealtimeOrderTracking = (orderId?: string) => {
  const { user } = useAuth();
  const [trackingUpdates, setTrackingUpdates] = useState<OrderTracking[]>([]);

  useEffect(() => {
    if (!user || !orderId) return;

    console.log('Setting up realtime subscription for order:', orderId);

    const channel = supabase
      .channel('order-tracking-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'order_tracking',
          filter: `order_id=eq.${orderId}`
        },
        (payload) => {
          console.log('Realtime order tracking update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setTrackingUpdates(prev => [...prev, payload.new as OrderTracking]);
          } else if (payload.eventType === 'UPDATE') {
            setTrackingUpdates(prev => 
              prev.map(item => 
                item.id === payload.new.id ? payload.new as OrderTracking : item
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [user, orderId]);

  return { trackingUpdates };
};