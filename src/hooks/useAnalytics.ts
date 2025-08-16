import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  topProducts: Array<{
    name: string;
    total_sold: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
}

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Get total revenue and orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, created_at, status');

      if (ordersError) throw ordersError;

      // Get total products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id')
        .eq('is_active', true);

      if (productsError) throw productsError;

      // Get total users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id');

      if (usersError) throw usersError;

      // Get top selling products
      const { data: topProducts, error: topProductsError } = await supabase
        .from('order_items')
        .select(`
          quantity,
          unit_price,
          products (
            name
          )
        `);

      if (topProductsError) throw topProductsError;

      // Calculate analytics
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const totalOrders = orders?.length || 0;
      const totalProducts = products?.length || 0;
      const totalUsers = users?.length || 0;

      // Process top products
      const productSales = topProducts?.reduce((acc: any, item) => {
        const productName = item.products?.name || 'Unknown';
        if (!acc[productName]) {
          acc[productName] = { total_sold: 0, revenue: 0 };
        }
        acc[productName].total_sold += item.quantity;
        acc[productName].revenue += item.quantity * item.unit_price;
        return acc;
      }, {});

      const topProductsList = Object.entries(productSales || {})
        .map(([name, data]: [string, any]) => ({
          name,
          total_sold: data.total_sold,
          revenue: data.revenue,
        }))
        .sort((a, b) => b.total_sold - a.total_sold)
        .slice(0, 5);

      // Process recent orders (last 7 days)
      const recentOrders = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayOrders = orders?.filter(order => 
          order.created_at.startsWith(dateStr)
        ) || [];
        
        return {
          date: dateStr,
          count: dayOrders.length,
          revenue: dayOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0),
        };
      }).reverse();

      return {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        topProducts: topProductsList,
        recentOrders,
      } as AnalyticsData;
    },
  });
};