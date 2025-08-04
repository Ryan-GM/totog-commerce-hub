-- Create order_tracking table for tracking order status updates
CREATE TABLE public.order_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('order_placed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  status_message TEXT,
  tracking_number TEXT,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on order_tracking
ALTER TABLE public.order_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for order_tracking
CREATE POLICY "Users can view tracking for their own orders" 
ON public.order_tracking 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_tracking.order_id 
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can create order tracking" 
ON public.order_tracking 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_tracking.order_id 
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update order tracking" 
ON public.order_tracking 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_order_tracking_updated_at
BEFORE UPDATE ON public.order_tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for order_tracking table
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_tracking;

-- Create function to automatically create initial tracking entry when order is created
CREATE OR REPLACE FUNCTION public.create_initial_order_tracking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.order_tracking (
    order_id,
    status,
    status_message
  ) VALUES (
    NEW.id,
    'order_placed',
    'Order has been placed successfully'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create tracking entry for new orders
CREATE TRIGGER create_order_tracking_on_order_insert
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.create_initial_order_tracking();

-- Create index for better performance
CREATE INDEX idx_order_tracking_order_id ON public.order_tracking(order_id);
CREATE INDEX idx_order_tracking_status ON public.order_tracking(status);
CREATE INDEX idx_order_tracking_created_at ON public.order_tracking(created_at);