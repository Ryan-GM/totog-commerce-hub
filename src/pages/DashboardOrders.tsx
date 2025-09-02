import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Package } from "lucide-react";
import { useAdminOrders, useAdminUpdateOrderStatus } from "@/hooks/useAdminOrders";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DashboardOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: orders, isLoading } = useAdminOrders();
  const updateOrderStatus = useAdminUpdateOrderStatus();
  const { formatCurrency } = useCurrency();

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId: string, status: string) => {
    await updateOrderStatus.mutateAsync({ orderId, status });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'shipped': return 'outline';
      default: return 'secondary';
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Manage customer orders and track fulfillment
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {order.profiles?.first_name} {order.profiles?.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.profiles?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.order_items?.length || 0} items</TableCell>
                  <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order.id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.order_number}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold">Customer</h4>
                              <p>{order.profiles?.first_name} {order.profiles?.last_name}</p>
                              <p className="text-sm text-muted-foreground">{order.profiles?.email}</p>
                              
                            </div>
                            <div>
                              <h4 className="font-semibold">Order Info</h4>
                              <p>Status: <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge></p>
                              <p>Total: {formatCurrency(order.total_amount)}</p>
                              <p className="text-sm">Payment: {order.payment_method || 'N/A'}</p>
                              <p className="text-sm">Payment Status: <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>{order.payment_status}</Badge></p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold">Shipping Address</h4>
                              <p className="text-sm">{order.shipping_address?.firstName} {order.shipping_address?.lastName}</p>
                              <p className="text-sm">{order.shipping_address?.address}</p>
                              <p className="text-sm">{order.shipping_address?.city}, {order.shipping_address?.zip}</p>
                              <p className="text-sm">{order.shipping_address?.country}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Billing Address</h4>
                              <p className="text-sm">{order.billing_address?.firstName} {order.billing_address?.lastName}</p>
                              <p className="text-sm">{order.billing_address?.address}</p>
                              <p className="text-sm">{order.billing_address?.city}, {order.billing_address?.zip}</p>
                              <p className="text-sm">{order.billing_address?.country}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.order_items?.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border rounded p-2">
                                  <div className="flex items-center space-x-2">
                                    {item.products?.images?.[0] && (
                                      <img
                                        src={item.products.images[0]}
                                        alt={item.products.name}
                                        className="h-8 w-8 rounded object-cover"
                                      />
                                    )}
                                    <span>{item.products?.name}</span>
                                  </div>
                                  <div>
                                    <span>Qty: {item.quantity}</span>
                                    <span className="ml-4">{formatCurrency(item.total_price)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}