
-- Add comprehensive e-commerce categories
INSERT INTO public.categories (name, description) VALUES
-- Electronics & Technology
('Laptops & Computers', 'Laptops, desktops, tablets, and computer accessories'),
('Smartphones & Tablets', 'Mobile phones, tablets, and mobile accessories'),
('TV & Audio', 'Televisions, sound systems, speakers, and audio equipment'),
('Cameras & Photography', 'Digital cameras, lenses, photography equipment'),
('Gaming', 'Gaming consoles, video games, gaming accessories'),
('Smart Home & Security', 'Smart home devices, security systems, home automation'),
('Networking & Internet', 'Routers, modems, networking equipment'),
('Software & Digital', 'Software licenses, digital downloads, apps'),

-- Fashion & Beauty
('Mens Fashion', 'Clothing, shoes, and accessories for men'),
('Womens Fashion', 'Clothing, shoes, and accessories for women'),
('Kids & Baby Fashion', 'Clothing and accessories for children and babies'),
('Shoes', 'Footwear for all ages and occasions'),
('Bags & Luggage', 'Handbags, backpacks, luggage, and travel accessories'),
('Watches & Jewelry', 'Timepieces, jewelry, and fashion accessories'),
('Beauty & Personal Care', 'Cosmetics, skincare, fragrances, and personal hygiene'),
('Hair Care & Styling', 'Hair products, styling tools, and accessories'),

-- Home & Garden
('Furniture', 'Home and office furniture, seating, storage'),
('Home Decor', 'Decorative items, artwork, lighting, and accessories'),
('Kitchen & Dining', 'Cookware, appliances, utensils, and dining sets'),
('Bedding & Bath', 'Bed linens, towels, bathroom accessories'),
('Garden & Outdoor', 'Gardening tools, outdoor furniture, plants'),
('Home Improvement', 'Tools, hardware, building materials'),
('Cleaning & Laundry', 'Cleaning supplies, laundry products, storage solutions'),

-- Health & Sports
('Health & Wellness', 'Vitamins, supplements, medical devices, health monitors'),
('Sports & Fitness', 'Exercise equipment, sportswear, fitness accessories'),
('Outdoor Recreation', 'Camping, hiking, fishing, outdoor sports equipment'),
('Nutrition & Supplements', 'Protein powders, vitamins, health supplements'),

-- Automotive
('Car Parts & Accessories', 'Auto parts, car accessories, maintenance items'),
('Motorcycles & Parts', 'Motorcycle parts, accessories, and gear'),
('Car Electronics', 'GPS, dash cams, car audio systems'),
('Tools & Equipment', 'Automotive tools, diagnostic equipment'),

-- Books & Media
('Books', 'Fiction, non-fiction, educational, and reference books'),
('Movies & TV Shows', 'DVDs, Blu-rays, digital movies'),
('Music', 'CDs, vinyl records, digital music'),
('Magazines & Newspapers', 'Periodicals and subscriptions'),

-- Toys & Games
('Toys & Games', 'Toys for all ages, board games, puzzles'),
('Educational Toys', 'Learning toys, STEM kits, educational games'),
('Action Figures & Collectibles', 'Collectible figures, trading cards'),
('Arts & Crafts', 'Art supplies, craft kits, creative materials'),

-- Food & Beverages
('Groceries', 'Food items, pantry staples, snacks'),
('Beverages', 'Soft drinks, juices, water, coffee, tea'),
('Gourmet & Specialty Foods', 'Premium foods, international cuisine, specialty items'),
('Organic & Natural', 'Organic foods, natural products, health foods'),

-- Baby & Kids
('Baby Care', 'Diapers, feeding supplies, baby care products'),
('Baby Gear', 'Strollers, car seats, baby furniture'),
('Maternity', 'Maternity clothing and accessories'),
('School & Office Supplies', 'Stationery, school supplies, office equipment'),

-- Pet Supplies
('Pet Food', 'Dog food, cat food, pet treats'),
('Pet Accessories', 'Pet toys, collars, bedding, carriers'),
('Pet Health', 'Pet medications, grooming supplies, health products'),

-- Industrial & Scientific
('Industrial Equipment', 'Manufacturing equipment, industrial tools'),
('Laboratory Supplies', 'Scientific instruments, lab equipment'),
('Safety Equipment', 'Safety gear, protective equipment'),

-- Gift Cards & Services
('Gift Cards', 'Digital and physical gift cards'),
('Services', 'Digital services, subscriptions, warranties'),
('Travel & Tourism', 'Travel accessories, luggage, travel services')

ON CONFLICT (name) DO NOTHING;
