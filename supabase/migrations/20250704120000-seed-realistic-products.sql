
-- Insert realistic products with proper categorization and branding

-- First, let's get some category and brand IDs for reference
-- Electronics Products

-- Smartphones & Tablets
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'iPhone 15 Pro Max',
  'The most advanced iPhone yet with titanium design, powerful A17 Pro chip, and professional camera system. Experience the future of mobile technology with enhanced performance and stunning visuals.',
  'Latest iPhone with A17 Pro chip and titanium design',
  189999.00,
  209999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['A17 Pro Chip', 'Titanium Design', 'Pro Camera System', '5G Connectivity', 'Face ID', 'iOS 17'],
  '{"screen_size": "6.7 inches", "storage": ["128GB", "256GB", "512GB", "1TB"], "colors": ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"], "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto", "battery": "Up to 29 hours video playback", "connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3"}',
  25,
  true,
  'APL-IP15PM-128'
FROM categories c, brands b 
WHERE c.name = 'Smartphones & Tablets' AND b.name = 'Apple';

INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Samsung Galaxy S24 Ultra',
  'Premium Android flagship with S Pen, advanced AI features, and exceptional camera capabilities. Perfect for productivity and creativity with the latest Samsung innovations.',
  'Flagship Android phone with S Pen and AI features',
  159999.00,
  179999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['S Pen Included', 'AI Photo Editing', '200MP Camera', '5G Ready', 'Samsung DeX', 'Android 14'],
  '{"screen_size": "6.8 inches", "storage": ["256GB", "512GB", "1TB"], "colors": ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"], "camera": "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto", "battery": "5000mAh", "special_features": "S Pen, Samsung DeX"}',
  18,
  true,
  'SAM-GS24U-256'
FROM categories c, brands b 
WHERE c.name = 'Smartphones & Tablets' AND b.name = 'Samsung';

-- Laptops & Computers
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'MacBook Pro 16-inch M3 Pro',
  'Professional laptop with cutting-edge M3 Pro chip for demanding creative workflows. Perfect for video editing, 3D rendering, and software development with exceptional performance and battery life.',
  'Professional laptop with M3 Pro chip for creative workflows',
  329999.00,
  359999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['M3 Pro Chip', '16-inch Liquid Retina XDR Display', 'Up to 22 hours battery', '1080p FaceTime Camera', 'Six-speaker Sound System', 'macOS Sonoma'],
  '{"screen_size": "16.2 inches", "processor": "Apple M3 Pro", "memory": ["18GB", "36GB"], "storage": ["512GB SSD", "1TB SSD", "2TB SSD", "4TB SSD"], "colors": ["Space Black", "Silver"], "ports": "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3", "weight": "2.16 kg"}',
  12,
  true,
  'APL-MBP16-M3P'
FROM categories c, brands b 
WHERE c.name = 'Laptops & Computers' AND b.name = 'Apple';

INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Dell XPS 13 Plus',
  'Premium ultrabook with sleek design and powerful performance. Ideal for professionals who need portability without compromising on performance and style.',
  'Premium ultrabook with sleek design and powerful performance',
  179999.00,
  199999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Intel Core i7', '13.4-inch OLED Display', 'Haptic Touchpad', 'Zero Lattice Keyboard', 'Thunderbolt 4', 'Windows 11 Pro'],
  '{"screen_size": "13.4 inches", "processor": "Intel Core i7-1360P", "memory": ["16GB", "32GB"], "storage": ["512GB SSD", "1TB SSD", "2TB SSD"], "colors": ["Platinum", "Graphite"], "display": "OLED 3.5K", "weight": "1.26 kg"}',
  15,
  true,
  'DEL-XPS13P-I7'
FROM categories c, brands b 
WHERE c.name = 'Laptops & Computers' AND b.name = 'Dell';

-- Gaming Products
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'PlayStation 5 Console',
  'Next-generation gaming console with lightning-fast SSD and ray tracing support. Experience gaming like never before with exclusive titles and revolutionary DualSense controller.',
  'Next-generation gaming console with ultra-fast SSD',
  69999.00,
  79999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Ultra High Speed SSD', 'Ray Tracing', '4K Gaming', 'DualSense Controller', 'Tempest 3D Audio', 'Backwards Compatibility'],
  '{"storage": "825GB SSD", "resolution": "Up to 4K", "frame_rate": "Up to 120fps", "audio": "Tempest 3D AudioTech", "connectivity": "Wi-Fi 6, Bluetooth 5.1, Gigabit Ethernet", "dimensions": "390mm x 104mm x 260mm"}',
  8,
  true,
  'SNY-PS5-STD'
FROM categories c, brands b 
WHERE c.name = 'Gaming' AND b.name = 'Sony';

-- Fashion Products - Shoes
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Nike Air Max 270',
  'Lifestyle sneakers with the largest Max Air unit yet, providing exceptional comfort and style. Perfect for everyday wear with a modern silhouette and premium materials.',
  'Lifestyle sneakers with large Max Air unit for comfort',
  14999.00,
  17999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Max Air Unit', 'Mesh Upper', 'Rubber Outsole', 'Lifestyle Design', 'All-Day Comfort', 'Multiple Colorways'],
  '{"sizes": ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"], "colors": ["Black/White", "Triple Black", "White/Black", "Navy/White", "Red/Black"], "material": "Mesh and synthetic leather", "sole": "Rubber with Max Air unit", "gender": "Unisex"}',
  45,
  true,
  'NIKE-AM270-BW'
FROM categories c, brands b 
WHERE c.name = 'Shoes' AND b.name = 'Nike';

INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Adidas Ultraboost 22',
  'High-performance running shoes with responsive BOOST midsole and Primeknit upper. Engineered for runners who demand premium comfort and energy return.',
  'High-performance running shoes with BOOST technology',
  18999.00,
  21999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['BOOST Midsole', 'Primeknit Upper', 'Continental Rubber Outsole', 'ARAMIS Analysis', 'Carbon Plate', 'Running Specific'],
  '{"sizes": ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"], "colors": ["Core Black", "Cloud White", "Solar Red", "Collegiate Navy", "Grey"], "material": "Primeknit textile", "sole": "Continental rubber with BOOST", "gender": "Unisex", "activity": "Running"}',
  35,
  true,
  'ADD-UB22-CB'
FROM categories c, brands b 
WHERE c.name = 'Shoes' AND b.name = 'Adidas';

-- Beauty & Personal Care
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'L''Oréal Paris Revitalift Anti-Aging Serum',
  'Advanced anti-aging serum with Pro-Retinol and Vitamin C for younger-looking skin. Clinically proven to reduce fine lines and improve skin texture with regular use.',
  'Advanced anti-aging serum with Pro-Retinol and Vitamin C',
  4999.00,
  5999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Pro-Retinol Formula', 'Vitamin C', 'Anti-Aging', 'Dermatologist Tested', 'Non-Comedogenic', 'Suitable for All Skin Types'],
  '{"volume": "30ml", "key_ingredients": ["Pro-Retinol", "Vitamin C", "Hyaluronic Acid"], "skin_type": "All skin types", "age_group": "25+", "application": "Day and Night", "texture": "Lightweight serum"}',
  60,
  false,
  'LOR-RA-SERUM-30'
FROM categories c, brands b 
WHERE c.name = 'Beauty & Personal Care' AND b.name = 'L''Oréal';

-- Home & Kitchen
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'KitchenAid Artisan Stand Mixer',
  'Professional-grade stand mixer perfect for baking enthusiasts. Durable construction with powerful motor and multiple attachments for versatile food preparation.',
  'Professional stand mixer for baking and food preparation',
  45999.00,
  52999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['325-Watt Motor', '5-Quart Bowl', '10 Mixing Speeds', 'Tilt-Head Design', 'Multiple Attachments', 'Durable Construction'],
  '{"capacity": "5 Quart", "power": "325 Watts", "speeds": "10", "colors": ["Empire Red", "Onyx Black", "White", "Silver", "Aqua Sky"], "attachments": ["Flat Beater", "Dough Hook", "Wire Whip"], "dimensions": "35.3 x 22.1 x 35.6 cm", "weight": "11.12 kg"}',
  20,
  true,
  'KA-ARTISAN-5Q'
FROM categories c, brands b 
WHERE c.name = 'Kitchen & Dining' AND b.name = 'KitchenAid';

-- Sports & Fitness
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Under Armour HeatGear Training Shirt',
  'Moisture-wicking training shirt designed for intense workouts. Ultra-lightweight fabric keeps you cool and dry during high-performance activities.',
  'Moisture-wicking training shirt for intense workouts',
  3999.00,
  4999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['HeatGear Technology', 'Moisture Wicking', 'Anti-Odor Technology', '4-Way Stretch', 'UPF 30+', 'Athletic Fit'],
  '{"sizes": ["XS", "S", "M", "L", "XL", "XXL"], "colors": ["Black", "Navy", "Red", "White", "Grey"], "material": "100% Polyester", "fit": "Athletic", "gender": "Men", "activity": ["Training", "Running", "Gym"]}',
  80,
  false,
  'UA-HG-TS-M'
FROM categories c, brands b 
WHERE c.name = 'Sports & Fitness' AND b.name = 'Under Armour';

-- Watches & Jewelry
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'Casio G-Shock GA-2100',
  'Rugged digital-analog watch with carbon core guard structure. Perfect for outdoor activities and daily wear with shock resistance and water resistance.',
  'Rugged digital-analog watch with carbon core protection',
  12999.00,
  14999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Carbon Core Guard', 'Shock Resistant', 'Water Resistant 200M', 'World Time', 'LED Light', 'Analog-Digital Display'],
  '{"case_material": "Carbon fiber reinforced resin", "band_material": "Resin", "water_resistance": "200 meters", "colors": ["Black", "Blue", "Red", "White", "Camouflage"], "functions": ["World Time", "Stopwatch", "Timer", "Alarm"], "battery_life": "3 years"}',
  30,
  true,
  'CASIO-GS-GA2100'
FROM categories c, brands b 
WHERE c.name = 'Watches & Jewelry' AND b.name = 'Casio';

-- Books
INSERT INTO public.products (name, description, short_description, price, original_price, category_id, brand_id, images, features, specifications, stock_quantity, is_featured, sku) 
SELECT 
  'The Psychology of Money - Morgan Housel',
  'Timeless lessons on wealth, greed, and happiness from one of the most important financial books ever written. Essential reading for understanding money and investing.',
  'Essential financial literacy book about wealth and happiness',
  2499.00,
  2999.00,
  c.id,
  b.id,
  ARRAY['/api/placeholder/400/400'],
  ARRAY['Bestselling Author', 'Financial Literacy', 'Investment Psychology', '19 Stories', 'Practical Wisdom', 'Easy to Read'],
  '{"pages": 256, "publisher": "Harriman House", "language": "English", "format": "Paperback", "isbn": "9780857197689", "publication_year": 2020, "genre": "Finance, Psychology", "reading_level": "Intermediate"}',
  100,
  false,
  'BOOK-POM-MH'
FROM categories c, brands b 
WHERE c.name = 'Books' AND b.name = 'Generic';

-- Add some variants for key products
INSERT INTO public.product_variants (product_id, variant_type, variant_value, price_adjustment, stock_quantity)
SELECT p.id, 'storage', '256GB', 15000.00, 15
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

INSERT INTO public.product_variants (product_id, variant_type, variant_value, price_adjustment, stock_quantity)
SELECT p.id, 'storage', '512GB', 30000.00, 10
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

INSERT INTO public.product_variants (product_id, variant_type, variant_value, price_adjustment, stock_quantity)
SELECT p.id, 'storage', '1TB', 45000.00, 5
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

INSERT INTO public.product_variants (product_id, variant_type, variant_value, price_adjustment, stock_quantity)
SELECT p.id, 'color', 'Blue Titanium', 0.00, 8
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

INSERT INTO public.product_variants (product_id, variant_type, variant_value, price_adjustment, stock_quantity)
SELECT p.id, 'color', 'White Titanium', 0.00, 7
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

-- Add some realistic reviews
INSERT INTO public.product_reviews (product_id, rating, title, comment, verified_purchase)
SELECT p.id, 5, 'Amazing Performance!', 'The iPhone 15 Pro Max exceeded my expectations. The camera quality is outstanding and the battery lasts all day. Definitely worth the upgrade!', true
FROM products p WHERE p.name = 'iPhone 15 Pro Max';

INSERT INTO public.product_reviews (product_id, rating, title, comment, verified_purchase)
SELECT p.id, 4, 'Great laptop for work', 'Perfect for my daily work needs. The M3 Pro chip handles everything I throw at it smoothly. Only wish it was a bit lighter for travel.', true
FROM products p WHERE p.name = 'MacBook Pro 16-inch M3 Pro';

INSERT INTO public.product_reviews (product_id, rating, title, comment, verified_purchase)
SELECT p.id, 5, 'Excellent running shoes', 'Most comfortable running shoes I''ve ever owned. The BOOST technology really makes a difference during long runs.', true
FROM products p WHERE p.name = 'Adidas Ultraboost 22';

INSERT INTO public.product_reviews (product_id, rating, title, comment, verified_purchase)
SELECT p.id, 4, 'Good gaming console', 'Great console with impressive graphics. Loading times are incredibly fast. Just wish there were more exclusive games available.', true
FROM products p WHERE p.name = 'PlayStation 5 Console';
