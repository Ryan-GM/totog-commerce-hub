
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
      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name),
          brands:brand_id(name)
        `)
        .eq('is_active', true);

      if (filters?.category && filters.category !== 'All') {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', filters.category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
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
        .single();

      if (error) throw error;
      return data as ProductWithRelations;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
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
