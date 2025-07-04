
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Extended Product type with joined data and new features
export interface ProductWithRelations {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price: number;
  original_price: number | null;
  sku: string | null;
  stock_quantity: number;
  category_id: string | null;
  brand_id: string | null;
  images: string[];
  features: string[];
  specifications: Record<string, any>;
  is_active: boolean;
  is_featured: boolean;
  weight: number | null;
  dimensions: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  categories: { name: string; description: string | null } | null;
  brands: { name: string; description: string | null } | null;
  average_rating?: number;
  review_count?: number;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  variant_type: string;
  variant_value: string;
  price_adjustment: number;
  stock_quantity: number;
  sku_suffix: string | null;
  is_active: boolean;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  verified_purchase: boolean;
  helpful_count: number;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      console.log('Fetching products with filters:', filters);
      
      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name, description),
          brands:brand_id(name, description)
        `)
        .eq('is_active', true);

      // Apply category filter
      if (filters?.category && filters.category !== 'All') {
        console.log('Applying category filter:', filters.category);
        
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id')
          .eq('name', filters.category)
          .maybeSingle();
        
        if (categoryError) {
          console.error('Category filter error:', categoryError);
        } else if (categoryData) {
          query = query.eq('category_id', categoryData.id);
          console.log('Applied category filter for ID:', categoryData.id);
        }
      }

      // Apply brand filter
      if (filters?.brand && filters.brand !== 'All') {
        console.log('Applying brand filter:', filters.brand);
        
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .select('id')
          .eq('name', filters.brand)
          .maybeSingle();
        
        if (brandError) {
          console.error('Brand filter error:', brandError);
        } else if (brandData) {
          query = query.eq('brand_id', brandData.id);
          console.log('Applied brand filter for ID:', brandData.id);
        }
      }

      // Apply search filter
      if (filters?.search && filters.search.trim()) {
        console.log('Applying search filter:', filters.search);
        const searchTerm = filters.search.trim();
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`);
      }

      // Apply featured filter
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      // Apply price filters
      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      // Apply stock filter
      if (filters?.inStock) {
        query = query.gt('stock_quantity', 0);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Products query error:', error);
        throw error;
      }
      
      console.log('Products fetched:', data?.length || 0);
      
      // For now, return products with default ratings until the functions are available
      const enhancedProducts = (data || []).map(product => ({
        ...product,
        average_rating: 4.2, // Default rating
        review_count: Math.floor(Math.random() * 50) + 10, // Random review count
      } as ProductWithRelations));

      return enhancedProducts;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name, description),
          brands:brand_id(name, description)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // For now, return empty variants until the table is properly typed
      const variantsData: ProductVariant[] = [];

      return {
        ...data,
        variants: variantsData,
        average_rating: 4.2, // Default rating
        review_count: Math.floor(Math.random() * 50) + 10, // Random review count
      } as ProductWithRelations;
    },
    enabled: !!id,
  });
};

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async () => {
      // For now, return empty array until the table is properly typed
      return [] as ProductReview[];
    },
    enabled: !!productId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Categories query error:', error);
        throw error;
      }
      
      console.log('Categories fetched:', data?.length || 0);
      return data;
    },
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedProducts = (limit: number = 8) => {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name, description),
          brands:brand_id(name, description)
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(limit)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Return products with default ratings until the functions are available
      const enhancedProducts = (data || []).map(product => ({
        ...product,
        average_rating: 4.2 + (Math.random() * 0.8), // Random rating between 4.2-5.0
        review_count: Math.floor(Math.random() * 100) + 20, // Random review count
      } as ProductWithRelations));

      return enhancedProducts;
    },
  });
};

export const useSimilarProducts = (productId: string, categoryId?: string, limit: number = 4) => {
  return useQuery({
    queryKey: ['similar-products', productId, categoryId, limit],
    queryFn: async () => {
      if (!categoryId) return [];

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name, description),
          brands:brand_id(name, description)
        `)
        .eq('is_active', true)
        .eq('category_id', categoryId)
        .neq('id', productId)
        .limit(limit)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Return products with default ratings until the functions are available
      const enhancedProducts = (data || []).map(product => ({
        ...product,
        average_rating: 4.0 + (Math.random() * 1.0), // Random rating between 4.0-5.0
        review_count: Math.floor(Math.random() * 80) + 15, // Random review count
      } as ProductWithRelations));

      return enhancedProducts;
    },
    enabled: !!categoryId,
  });
};
