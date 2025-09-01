
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Package, Download, Eye, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useOrderTracking, getStatusLabel } from '@/hooks/useOrderTracking';
import { useOrders } from '@/hooks/useOrders';
import { useInvoiceGenerator } from '@/hooks/useInvoiceGenerator';
import { useCurrency } from '@/contexts/CurrencyContext';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useOrders();
  const { generateInvoice } = useInvoiceGenerator();
  const { formatCurrency } = useCurrency();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      order_placed: { variant: 'secondary' as const, label: 'Order Placed', icon: Clock },
      processing: { variant: 'default' as const, label: 'Processing', icon: Package },
      out_for_delivery: { variant: 'default' as const, label: 'Out for Delivery', icon: Truck },
      delivered: { variant: 'default' as const, label: 'Delivered', icon: CheckCircle },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled', icon: AlertCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.order_placed;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const OrderTrackingTimeline = ({ orderId }: { orderId: string }) => {
    const { data: trackingData = [] } = useOrderTracking(orderId);
    
    if (trackingData.length === 0) return null;

    const statuses = ['order_placed', 'processing', 'out_for_delivery', 'delivered'];
    const currentStatusIndex = statuses.indexOf(trackingData[trackingData.length - 1]?.status || 'order_placed');

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Order Tracking</h4>
        <div className="relative">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 z-0" />
            <div 
              className="absolute top-4 left-0 h-0.5 bg-green-500 z-0 transition-all duration-300"
              style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
            />
            
            {statuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <div key={status} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${
                    isCompleted 
                      ? 'border-green-500 text-green-500' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 fill-current" />
                    ) : (
                      <div className="w-2 h-2 bg-current rounded-full" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {getStatusLabel(status)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const handleDownloadInvoice = (order: any) => {
    generateInvoice({ order, items: order.order_items });
  };

  const handleViewOrderDetail = (orderId: string) => {
    navigate(`/order-tracking/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Orders</h1>
            <p className="text-gray-600 mb-6">There was an error loading your order history. Please try again.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        Order #{order.order_number}
                      </CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-xl font-bold mt-2">{formatCurrency(order.total_amount)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.products?.name || 'Product'}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.total_price)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <OrderTrackingTimeline orderId={order.id} />
                  
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewOrderDetail(order.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadInvoice(order)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/order-tracking/${order.id}`)}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Track Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                <Button onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
