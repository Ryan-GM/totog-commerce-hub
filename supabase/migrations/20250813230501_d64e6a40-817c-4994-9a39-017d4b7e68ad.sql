-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Create policies for uploads bucket
CREATE POLICY "Anyone can view uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own uploads" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Update brands table to allow admin operations
CREATE POLICY "Admins can manage brands" 
ON public.brands 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Update categories table to allow admin operations  
CREATE POLICY "Admins can manage categories" 
ON public.categories 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Update products table to allow admin operations
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));