import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useAdminProducts, useDeleteProduct } from "@/hooks/useAdminProducts";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import { useAdminBrands } from "@/hooks/useAdminBrands";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductFormDialog } from "@/components/dashboard/ProductFormDialog";

export default function DashboardProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: products, isLoading } = useAdminProducts();
  const { data: categories } = useAdminCategories();
  const { data: brands } = useAdminBrands();
  const deleteProduct = useDeleteProduct();
  const { formatCurrency } = useCurrency();

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct.mutateAsync(id);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded"></div>
          <div className="h-96 bg-muted animate-pulse rounded"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {product.images?.[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      )}
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.sku || '-'}</TableCell>
                  <TableCell>{product.categories?.name || '-'}</TableCell>
                  <TableCell>{product.brands?.name || '-'}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ProductFormDialog
        open={isFormOpen}
        onClose={handleCloseForm}
        product={selectedProduct}
        categories={categories || []}
        brands={brands || []}
      />
    </DashboardLayout>
  );
}