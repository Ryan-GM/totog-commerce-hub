
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Extended Product type with joined data
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
  categories: { name: string } | null;
  brands: { name: string } | null;
}

export const useProducts = (filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      console.log('Fetching products with filters:', filters);
      
      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name),
          brands:brand_id(name)
        `)
        .eq('is_active', true);

      // Apply category filter
      if (filters?.category && filters.category !== 'All') {
        console.log('Applying category filter:', filters.category);
        
        // First get the category ID
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

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Products query error:', error);
        throw error;
      }
      
      console.log('Products fetched:', data?.length || 0);
      return data as ProductWithRelations[];
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
          categories:category_id(name),
          brands:brand_id(name)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      return data as ProductWithRelations;
    },
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
