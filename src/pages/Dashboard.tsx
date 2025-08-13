import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Building2, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import { useAdminBrands } from "@/hooks/useAdminBrands";

export default function Dashboard() {
  const { data: products } = useAdminProducts();
  const { data: categories } = useAdminCategories();
  const { data: brands } = useAdminBrands();

  const stats = [
    {
      title: "Total Products",
      value: products?.length || 0,
      icon: Package,
      description: "Active products in store",
    },
    {
      title: "Categories",
      value: categories?.length || 0,
      icon: Tag,
      description: "Product categories",
    },
    {
      title: "Brands",
      value: brands?.length || 0,
      icon: Building2,
      description: "Partner brands",
    },
    {
      title: "Active Products",
      value: products?.filter(p => p.is_active).length || 0,
      icon: TrendingUp,
      description: "Currently active",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your TotoG Commerce dashboard
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>
                Latest products added to your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products?.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Stock: {product.stock_quantity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common management tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a
                  href="/dashboard/products"
                  className="block p-3 rounded border hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Add New Product</div>
                  <div className="text-sm text-muted-foreground">
                    Create a new product listing
                  </div>
                </a>
                <a
                  href="/dashboard/categories"
                  className="block p-3 rounded border hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Manage Categories</div>
                  <div className="text-sm text-muted-foreground">
                    Organize your product categories
                  </div>
                </a>
                <a
                  href="/dashboard/brands"
                  className="block p-3 rounded border hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Manage Brands</div>
                  <div className="text-sm text-muted-foreground">
                    Add and edit brand information
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}