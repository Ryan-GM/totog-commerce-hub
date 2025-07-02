
-- Add more categories to cover broader market segments
INSERT INTO public.categories (name, description) VALUES
('Beauty & Personal Care', 'Skincare, makeup, fragrances, and personal hygiene products'),
('Automotive Accessories', 'Car parts, tools, and automotive enhancement products'),
('Home Decor & Furnishings', 'Furniture, decorative items, and home improvement products'),
('Books & Stationery', 'Books, notebooks, pens, and office stationery supplies'),
('Kids & Toys', 'Toys, games, and products designed for children'),
('Gardening & Outdoor', 'Garden tools, plants, outdoor furniture, and landscaping supplies'),
('Sports & Fitness', 'Exercise equipment, sportswear, and fitness accessories'),
('Pets & Supplies', 'Pet food, toys, accessories, and care products'),
('Office & School Equipment', 'Office furniture, school supplies, and workplace essentials'),
('Health & Wellness', 'Vitamins, supplements, medical devices, and wellness products'),
('Services & Subscriptions', 'Digital services, memberships, and subscription-based offerings')
ON CONFLICT (name) DO NOTHING;

-- Update wallet currency to KES
UPDATE public.wallets SET currency = 'KES' WHERE currency = 'USD';

-- Add order tracking statuses
CREATE TABLE IF NOT EXISTS public.order_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('order_placed', 'processing', 'out_for_delivery', 'delivered', 'cancelled')),
  status_message TEXT,
  tracking_number TEXT,
  estimated_delivery DATE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on order tracking
ALTER TABLE public.order_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policy for order tracking
CREATE POLICY "Users can view tracking for their own orders" ON public.order_tracking FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_tracking.order_id AND orders.user_id = auth.uid())
);

-- Add trigger for updated_at
CREATE TRIGGER update_order_tracking_updated_at BEFORE UPDATE ON public.order_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_order_tracking_order_id ON public.order_tracking(order_id);
CREATE INDEX idx_order_tracking_status ON public.order_tracking(status);
