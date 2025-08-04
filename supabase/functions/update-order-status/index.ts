import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateOrderStatusRequest {
  orderId: string;
  status: 'order_placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusMessage?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  location?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, status, statusMessage, trackingNumber, estimatedDelivery, location }: UpdateOrderStatusRequest = await req.json();

    if (!orderId || !status) {
      return new Response(
        JSON.stringify({ error: 'Order ID and status are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Updating order status:', { orderId, status, statusMessage });

    // Create new tracking entry
    const { data: trackingData, error: trackingError } = await supabase
      .from('order_tracking')
      .insert({
        order_id: orderId,
        status,
        status_message: statusMessage || `Order status updated to ${status}`,
        tracking_number: trackingNumber,
        estimated_delivery: estimatedDelivery,
        location
      })
      .select()
      .single();

    if (trackingError) {
      console.error('Error creating tracking entry:', trackingError);
      return new Response(
        JSON.stringify({ error: 'Failed to create tracking entry' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (orderError) {
      console.error('Error updating order status:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to update order status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Order status updated successfully:', trackingData);

    return new Response(
      JSON.stringify({ success: true, tracking: trackingData }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in update-order-status function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);