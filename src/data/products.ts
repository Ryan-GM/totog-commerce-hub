
import { useProducts, useProduct } from '@/hooks/useProducts';

// Legacy interface for backward compatibility
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
}

// Transform database product to legacy format
const transformProduct = (dbProduct: any): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  price: Number(dbProduct.price),
  originalPrice: dbProduct.original_price ? Number(dbProduct.original_price) : undefined,
  image: dbProduct.images?.[0] || '/placeholder.svg',
  category: dbProduct.categories?.name || 'Electronics',
  rating: 4.5, // Default rating for now
  reviews: 120, // Default reviews for now
  description: dbProduct.description || '',
  features: dbProduct.features || [],
  inStock: dbProduct.stock_quantity > 0,
});

// Legacy export - these will be replaced by hooks
export const products: Product[] = [];

export const getProductById = (id: string): Product | undefined => {
  // This is a fallback for components that still use this function
  // In the updated components, we'll use the useProduct hook instead
  return undefined;
};

export const getSimilarProducts = (id: string, limit: number = 4): Product[] => {
  // This is a fallback for components that still use this function
  // In the updated components, we'll use the useProducts hook with filters
  return [];
};

// Export hooks for new usage
export { useProducts, useProduct };
