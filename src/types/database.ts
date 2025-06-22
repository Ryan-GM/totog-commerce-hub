
export interface Product {
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
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  subtotal: number;
  tax_amount: number | null;
  shipping_amount: number | null;
  discount_amount: number | null;
  payment_method: string | null;
  payment_status: string;
  payment_reference: string | null;
  billing_address: Record<string, any>;
  shipping_address: Record<string, any>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}
