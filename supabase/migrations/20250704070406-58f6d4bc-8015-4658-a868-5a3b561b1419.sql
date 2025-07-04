
-- First, let's enhance the existing tables and add new ones for realistic product management

-- Add more realistic sample categories (keeping existing ones and adding more specific subcategories)
INSERT INTO public.categories (name, description) VALUES
-- Electronics subcategories
('Laptops & Computers', 'Laptops, desktops, tablets and computer accessories'),
('Smartphones & Tablets', 'Mobile phones, tablets and mobile accessories'),
('TV & Audio', 'Televisions, sound systems, headphones and audio equipment'),
('Cameras & Photography', 'Digital cameras, lenses, photography equipment'),
('Gaming', 'Gaming consoles, games, gaming accessories'),
('Smart Home & Security', 'Smart home devices, security cameras, home automation'),
('Networking & Internet', 'Routers, modems, networking equipment'),
('Software & Digital', 'Software licenses, digital downloads, apps'),

-- Fashion categories
('Mens Fashion', 'Men''s clothing, shirts, pants, suits'),
('Womens Fashion', 'Women''s clothing, dresses, tops, skirts'),
('Kids & Baby Fashion', 'Children''s clothing, baby wear, school uniforms'),
('Shoes', 'Men''s, women''s and children''s footwear'),
('Bags & Luggage', 'Handbags, backpacks, travel luggage, briefcases'),
('Watches & Jewelry', 'Wristwatches, jewelry, accessories'),

-- Beauty & Personal Care
('Beauty & Personal Care', 'Cosmetics, skincare, personal hygiene products'),
('Hair Care & Styling', 'Shampoos, styling products, hair tools'),

-- Home & Garden
('Furniture', 'Home and office furniture, decor'),
('Home Decor', 'Decorative items, artwork, lighting'),
('Kitchen & Dining', 'Cookware, appliances, dining sets'),
('Bedding & Bath', 'Bed linens, towels, bathroom accessories'),
('Garden & Outdoor', 'Gardening tools, outdoor furniture, plants'),
('Home Improvement', 'Tools, hardware, building materials'),
('Cleaning & Laundry', 'Cleaning supplies, laundry products'),

-- Health & Sports
('Health & Wellness', 'Health supplements, medical supplies, fitness equipment'),
('Sports & Fitness', 'Exercise equipment, sportswear, outdoor gear'),
('Outdoor Recreation', 'Camping gear, hiking equipment, outdoor sports'),
('Nutrition & Supplements', 'Vitamins, protein supplements, health foods'),

-- Automotive
('Car Parts & Accessories', 'Auto parts, car accessories, maintenance products'),
('Motorcycles & Parts', 'Motorcycle parts, accessories, gear'),
('Car Electronics', 'Car audio, GPS, dash cams, automotive electronics'),
('Tools & Equipment', 'Automotive tools, garage equipment'),

-- Books & Media
('Books', 'Physical books, educational materials, literature'),
('Movies & TV Shows', 'DVDs, Blu-rays, digital media'),
('Music', 'CDs, vinyl records, musical instruments'),
('Magazines & Newspapers', 'Periodicals, newspapers, subscriptions'),

-- Toys & Games
('Toys & Games', 'Children''s toys, board games, puzzles'),
('Educational Toys', 'Learning toys, STEM kits, educational games'),
('Action Figures & Collectibles', 'Collectible toys, action figures, memorabilia'),
('Arts & Crafts', 'Art supplies, craft materials, hobby kits'),

-- Food & Beverages
('Groceries', 'Food items, household essentials, pantry staples'),
('Beverages', 'Drinks, juices, water, alcoholic beverages'),
('Gourmet & Specialty Foods', 'Premium foods, international cuisine, delicacies'),
('Organic & Natural', 'Organic foods, natural products, health foods'),

-- Baby & Kids
('Baby Care', 'Baby care products, diapers, feeding supplies'),
('Baby Gear', 'Strollers, car seats, baby furniture'),
('Maternity', 'Maternity wear, pregnancy products, nursing supplies'),
('School & Office Supplies', 'Stationery, office equipment, school materials'),

-- Pet Supplies
('Pet Food', 'Dog food, cat food, pet treats, pet nutrition'),
('Pet Accessories', 'Pet toys, collars, beds, carriers'),
('Pet Health', 'Pet medications, grooming supplies, health products'),

-- Industrial & Business
('Industrial Equipment', 'Industrial machinery, commercial equipment'),
('Laboratory Supplies', 'Scientific equipment, lab materials, research tools'),
('Safety Equipment', 'Personal protective equipment, safety gear'),

-- Services & Digital
('Gift Cards', 'Gift cards, vouchers, prepaid cards'),
('Services', 'Professional services, consultations, subscriptions'),
('Travel & Tourism', 'Travel packages, booking services, travel accessories')
ON CONFLICT (name) DO NOTHING;

-- Add more realistic brands
INSERT INTO public.brands (name, description) VALUES
-- Technology Brands
('Apple', 'Premium consumer electronics and software'),
('Samsung', 'Global technology and electronics company'),
('Sony', 'Electronics, entertainment and gaming'),
('Microsoft', 'Software, cloud computing and hardware'),
('Google', 'Technology and internet services'),
('Dell', 'Computer technology and IT solutions'),
('HP', 'Technology products and printing solutions'),
('Lenovo', 'Personal computers and technology'),
('ASUS', 'Computer hardware and electronics'),
('Acer', 'Computer hardware and technology'),
('LG', 'Electronics and home appliances'),
('Huawei', 'Telecommunications and consumer electronics'),
('Xiaomi', 'Consumer electronics and smart devices'),
('OnePlus', 'Premium smartphone manufacturer'),
('Oppo', 'Mobile devices and accessories'),
('Vivo', 'Smartphone and consumer electronics'),
('Realme', 'Smartphone and AIoT products'),
('Canon', 'Imaging and optical products'),
('Nikon', 'Imaging and precision equipment'),
('GoPro', 'Action cameras and accessories'),

-- Fashion Brands
('Nike', 'Athletic footwear and apparel'),
('Adidas', 'Sports apparel and footwear'),
('Puma', 'Athletic and casual footwear'),
('Under Armour', 'Athletic clothing and accessories'),
('Levi''s', 'Denim and casual wear'),
('Calvin Klein', 'Fashion and lifestyle brand'),
('Tommy Hilfiger', 'Premium casual wear'),
('Polo Ralph Lauren', 'Luxury fashion and lifestyle'),
('H&M', 'Fast fashion and accessories'),
('Zara', 'Fashion retail and apparel'),
('Gucci', 'Luxury fashion and leather goods'),
('Louis Vuitton', 'Luxury fashion and accessories'),
('Chanel', 'Luxury fashion and beauty'),
('Rolex', 'Luxury watches and timepieces'),
('Casio', 'Watches and electronic instruments'),
('Seiko', 'Watches and timing instruments'),

-- Home & Lifestyle Brands
('IKEA', 'Home furnishing and furniture'),
('Samsung Home', 'Home appliances and electronics'),
('Whirlpool', 'Home appliances'),
('KitchenAid', 'Kitchen appliances and tools'),
('Dyson', 'Vacuum cleaners and home appliances'),
('Philips', 'Health technology and consumer products'),
('Panasonic', 'Electronics and home appliances'),
('Black & Decker', 'Power tools and home improvement'),
('DeWalt', 'Professional power tools'),
('Bosch', 'Technology and engineering solutions'),

-- Beauty & Personal Care
('L''Oréal', 'Beauty and cosmetics'),
('Nivea', 'Skincare and personal care'),
('Johnson & Johnson', 'Healthcare and consumer products'),
('Procter & Gamble', 'Consumer goods and personal care'),
('Unilever', 'Consumer goods and personal care'),
('Dove', 'Personal care and beauty products'),
('Neutrogena', 'Skincare and dermatology'),
('Olay', 'Skincare and anti-aging products'),

-- Automotive Brands
('Toyota', 'Automotive manufacturer'),
('Honda', 'Automotive and motorcycle manufacturer'),
('Ford', 'Automotive manufacturer'),
('BMW', 'Luxury automotive manufacturer'),
('Mercedes-Benz', 'Luxury automotive manufacturer'),
('Volkswagen', 'Automotive manufacturer'),
('Nissan', 'Automotive manufacturer'),
('Hyundai', 'Automotive manufacturer'),

-- Food & Beverage Brands
('Coca-Cola', 'Beverages and soft drinks'),
('PepsiCo', 'Food and beverage company'),
('Nestlé', 'Food and beverage products'),
('Unilever Foods', 'Food and beverage products'),
('Kellogg''s', 'Breakfast cereals and snacks'),
('General Mills', 'Consumer foods'),

-- Generic/Local Brands
('Generic', 'Generic brand products'),
('Local Brand', 'Local Kenyan brands'),
('Import Direct', 'Direct import products'),
('Premium Select', 'Premium product selection'),
('Value Choice', 'Value-oriented products'),
('EcoFriendly', 'Environmentally friendly products')
ON CONFLICT (name) DO NOTHING;

-- Create product variants table for different sizes, colors, models
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_type TEXT NOT NULL, -- 'size', 'color', 'model', 'storage', 'ram', etc.
  variant_value TEXT NOT NULL, -- '32GB', 'Red', 'Pro Max', etc.
  price_adjustment DECIMAL(10,2) DEFAULT 0, -- Additional price for this variant
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  sku_suffix TEXT, -- Additional SKU identifier for this variant
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product reviews table
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product import batches table for bulk imports
CREATE TABLE IF NOT EXISTS public.product_import_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  total_rows INTEGER NOT NULL DEFAULT 0,
  processed_rows INTEGER NOT NULL DEFAULT 0,
  successful_imports INTEGER NOT NULL DEFAULT 0,
  failed_imports INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  error_log JSONB DEFAULT '[]',
  imported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for new tables
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_import_batches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product variants (public read, admin write)
CREATE POLICY "Anyone can view active product variants" ON public.product_variants 
  FOR SELECT USING (is_active = true);

-- RLS Policies for product reviews (public read, users can write their own)
CREATE POLICY "Anyone can view approved reviews" ON public.product_reviews 
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create their own reviews" ON public.product_reviews 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.product_reviews 
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for import batches (admin only)
CREATE POLICY "Admins can manage import batches" ON public.product_import_batches 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_type_value ON public.product_variants(variant_type, variant_value);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON public.product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_products_name_search ON public.products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_products_description_search ON public.products USING gin(to_tsvector('english', description));

-- Create function to calculate average rating for products
CREATE OR REPLACE FUNCTION public.get_product_average_rating(product_uuid UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
  avg_rating DECIMAL(3,2);
BEGIN
  SELECT ROUND(AVG(rating::DECIMAL), 2) INTO avg_rating
  FROM public.product_reviews 
  WHERE product_id = product_uuid AND is_approved = true;
  
  RETURN COALESCE(avg_rating, 0);
END;
$$ LANGUAGE plpgsql STABLE;

-- Create function to get product review count
CREATE OR REPLACE FUNCTION public.get_product_review_count(product_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  review_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO review_count
  FROM public.product_reviews 
  WHERE product_id = product_uuid AND is_approved = true;
  
  RETURN COALESCE(review_count, 0);
END;
$$ LANGUAGE plpgsql STABLE;

-- Add triggers for updating timestamps
CREATE TRIGGER update_product_variants_updated_at 
  BEFORE UPDATE ON public.product_variants 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at 
  BEFORE UPDATE ON public.product_reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_import_batches_updated_at 
  BEFORE UPDATE ON public.product_import_batches 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
