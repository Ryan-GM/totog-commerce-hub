-- First, ensure we have proper categories
INSERT INTO public.categories (name, description, image_url) 
SELECT 'Electronics', 'Electronic devices and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Electronics');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Smartphones', 'Mobile phones and tablets', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Smartphones');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Laptops', 'Laptops and notebooks', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Laptops');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Audio', 'Headphones, speakers, and audio equipment', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Audio');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Wearables', 'Smartwatches and fitness trackers', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Wearables');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Gaming', 'Gaming consoles and accessories', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Gaming');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Cameras', 'Digital cameras and photography equipment', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Cameras');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Home Appliances', 'Smart home and kitchen appliances', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Home Appliances');

INSERT INTO public.categories (name, description, image_url) 
SELECT 'Accessories', 'Tech accessories and peripherals', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Accessories');

-- Ensure we have proper brands
INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Apple', 'Premium consumer electronics and software', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Apple');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Samsung', 'Global technology leader in electronics', 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Samsung');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Sony', 'Japanese multinational conglomerate', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Sony');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Microsoft', 'Leading software and hardware manufacturer', 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Microsoft');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Dell', 'Computer technology company', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Dell');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'HP', 'Information technology company', 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'HP');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Lenovo', 'Chinese multinational technology company', 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Lenovo');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'LG', 'South Korean electronics company', 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'LG');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Bose', 'Audio equipment manufacturer', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Bose_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Bose');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Canon', 'Japanese imaging and optical products', 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Canon_wordmark.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Canon');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Nikon', 'Japanese optics and imaging company', 'https://upload.wikimedia.org/wikipedia/commons/9/91/Nikon_Logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Nikon');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'JBL', 'Audio electronics company', 'https://upload.wikimedia.org/wikipedia/commons/0/0b/JBL_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'JBL');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Xiaomi', 'Chinese electronics manufacturer', 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Xiaomi');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Google', 'Technology company specializing in Internet services', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Google');

INSERT INTO public.brands (name, description, logo_url) 
SELECT 'Amazon', 'E-commerce and cloud computing company', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = 'Amazon');

-- Now update all products to have proper categories, brands, and images
DO $$
DECLARE
  electronics_id uuid;
  smartphones_id uuid;
  laptops_id uuid;
  audio_id uuid;
  wearables_id uuid;
  gaming_id uuid;
  cameras_id uuid;
  home_appliances_id uuid;
  accessories_id uuid;
  
  apple_id uuid;
  samsung_id uuid;
  sony_id uuid;
  microsoft_id uuid;
  dell_id uuid;
  hp_id uuid;
  lenovo_id uuid;
  lg_id uuid;
  bose_id uuid;
  canon_id uuid;
  nikon_id uuid;
  jbl_id uuid;
  xiaomi_id uuid;
  google_id uuid;
  amazon_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO electronics_id FROM categories WHERE name = 'Electronics' LIMIT 1;
  SELECT id INTO smartphones_id FROM categories WHERE name = 'Smartphones' LIMIT 1;
  SELECT id INTO laptops_id FROM categories WHERE name = 'Laptops' LIMIT 1;
  SELECT id INTO audio_id FROM categories WHERE name = 'Audio' LIMIT 1;
  SELECT id INTO wearables_id FROM categories WHERE name = 'Wearables' LIMIT 1;
  SELECT id INTO gaming_id FROM categories WHERE name = 'Gaming' LIMIT 1;
  SELECT id INTO cameras_id FROM categories WHERE name = 'Cameras' LIMIT 1;
  SELECT id INTO home_appliances_id FROM categories WHERE name = 'Home Appliances' LIMIT 1;
  SELECT id INTO accessories_id FROM categories WHERE name = 'Accessories' LIMIT 1;
  
  -- Get brand IDs
  SELECT id INTO apple_id FROM brands WHERE name = 'Apple' LIMIT 1;
  SELECT id INTO samsung_id FROM brands WHERE name = 'Samsung' LIMIT 1;
  SELECT id INTO sony_id FROM brands WHERE name = 'Sony' LIMIT 1;
  SELECT id INTO microsoft_id FROM brands WHERE name = 'Microsoft' LIMIT 1;
  SELECT id INTO dell_id FROM brands WHERE name = 'Dell' LIMIT 1;
  SELECT id INTO hp_id FROM brands WHERE name = 'HP' LIMIT 1;
  SELECT id INTO lenovo_id FROM brands WHERE name = 'Lenovo' LIMIT 1;
  SELECT id INTO lg_id FROM brands WHERE name = 'LG' LIMIT 1;
  SELECT id INTO bose_id FROM brands WHERE name = 'Bose' LIMIT 1;
  SELECT id INTO canon_id FROM brands WHERE name = 'Canon' LIMIT 1;
  SELECT id INTO nikon_id FROM brands WHERE name = 'Nikon' LIMIT 1;
  SELECT id INTO jbl_id FROM brands WHERE name = 'JBL' LIMIT 1;
  SELECT id INTO xiaomi_id FROM brands WHERE name = 'Xiaomi' LIMIT 1;
  SELECT id INTO google_id FROM brands WHERE name = 'Google' LIMIT 1;
  SELECT id INTO amazon_id FROM brands WHERE name = 'Amazon' LIMIT 1;

  -- Update products based on their names to assign proper categories and brands
  -- Smartphones
  UPDATE products SET 
    category_id = smartphones_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%iphone%' THEN apple_id
      WHEN LOWER(name) LIKE '%samsung%' OR LOWER(name) LIKE '%galaxy%' THEN samsung_id
      WHEN LOWER(name) LIKE '%xiaomi%' OR LOWER(name) LIKE '%redmi%' THEN xiaomi_id
      WHEN LOWER(name) LIKE '%pixel%' THEN google_id
      ELSE COALESCE(brand_id, samsung_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%phone%' OR LOWER(name) LIKE '%iphone%' OR LOWER(name) LIKE '%galaxy%' OR LOWER(name) LIKE '%pixel%';

  -- Laptops
  UPDATE products SET 
    category_id = laptops_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%macbook%' THEN apple_id
      WHEN LOWER(name) LIKE '%dell%' THEN dell_id
      WHEN LOWER(name) LIKE '%hp%' THEN hp_id
      WHEN LOWER(name) LIKE '%lenovo%' OR LOWER(name) LIKE '%thinkpad%' THEN lenovo_id
      WHEN LOWER(name) LIKE '%surface%' THEN microsoft_id
      ELSE COALESCE(brand_id, dell_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%laptop%' OR LOWER(name) LIKE '%macbook%' OR LOWER(name) LIKE '%thinkpad%' OR LOWER(name) LIKE '%surface%';

  -- Audio products
  UPDATE products SET 
    category_id = audio_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%airpods%' THEN apple_id
      WHEN LOWER(name) LIKE '%bose%' THEN bose_id
      WHEN LOWER(name) LIKE '%sony%' THEN sony_id
      WHEN LOWER(name) LIKE '%jbl%' THEN jbl_id
      WHEN LOWER(name) LIKE '%samsung%' THEN samsung_id
      ELSE COALESCE(brand_id, sony_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%headphone%' OR LOWER(name) LIKE '%earbuds%' OR LOWER(name) LIKE '%speaker%' OR LOWER(name) LIKE '%airpods%';

  -- Wearables
  UPDATE products SET 
    category_id = wearables_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%apple watch%' THEN apple_id
      WHEN LOWER(name) LIKE '%galaxy watch%' THEN samsung_id
      WHEN LOWER(name) LIKE '%xiaomi%' OR LOWER(name) LIKE '%mi band%' THEN xiaomi_id
      ELSE COALESCE(brand_id, samsung_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%watch%' OR LOWER(name) LIKE '%band%' OR LOWER(name) LIKE '%fitness%';

  -- Gaming
  UPDATE products SET 
    category_id = gaming_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%playstation%' OR LOWER(name) LIKE '%ps5%' THEN sony_id
      WHEN LOWER(name) LIKE '%xbox%' THEN microsoft_id
      ELSE COALESCE(brand_id, sony_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%playstation%' OR LOWER(name) LIKE '%xbox%' OR LOWER(name) LIKE '%gaming%' OR LOWER(name) LIKE '%controller%';

  -- Cameras
  UPDATE products SET 
    category_id = cameras_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%canon%' THEN canon_id
      WHEN LOWER(name) LIKE '%nikon%' THEN nikon_id
      WHEN LOWER(name) LIKE '%sony%' THEN sony_id
      ELSE COALESCE(brand_id, canon_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%camera%' OR LOWER(name) LIKE '%dslr%' OR LOWER(name) LIKE '%mirrorless%';

  -- Tablets
  UPDATE products SET 
    category_id = smartphones_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%ipad%' THEN apple_id
      WHEN LOWER(name) LIKE '%galaxy tab%' THEN samsung_id
      WHEN LOWER(name) LIKE '%surface%' THEN microsoft_id
      ELSE COALESCE(brand_id, apple_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%tablet%' OR LOWER(name) LIKE '%ipad%';

  -- Smart Home
  UPDATE products SET 
    category_id = home_appliances_id,
    brand_id = CASE 
      WHEN LOWER(name) LIKE '%echo%' OR LOWER(name) LIKE '%alexa%' THEN amazon_id
      WHEN LOWER(name) LIKE '%google%' OR LOWER(name) LIKE '%nest%' THEN google_id
      ELSE COALESCE(brand_id, amazon_id)
    END,
    images = CASE
      WHEN images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0 
      THEN ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800']
      ELSE images
    END
  WHERE LOWER(name) LIKE '%smart%' OR LOWER(name) LIKE '%echo%' OR LOWER(name) LIKE '%nest%' OR LOWER(name) LIKE '%alexa%';

  -- For any remaining products without categories or brands, assign defaults
  UPDATE products SET 
    category_id = COALESCE(category_id, electronics_id)
  WHERE category_id IS NULL;

  UPDATE products SET 
    brand_id = COALESCE(brand_id, samsung_id)
  WHERE brand_id IS NULL;

  UPDATE products SET 
    images = ARRAY['https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800']
  WHERE images IS NULL OR array_length(images, 1) IS NULL OR array_length(images, 1) = 0;

END $$;