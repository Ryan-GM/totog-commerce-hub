
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Download, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderHistory = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from useQuery
  const orders = [
    {
      id: '1',
      order_number: 'ORD-20241201-0001',
      status: 'delivered',
      total_amount: 299.99,
      created_at: '2024-12-01T10:00:00Z',
      items: [
        { name: 'Premium Headphones', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: '2',
      order_number: 'ORD-20241128-0002',
      status: 'shipped',
      total_amount: 149.99,
      created_at: '2024-11-28T15:30:00Z',
      items: [
        { name: 'Wireless Mouse', quantity: 2, price: 74.99 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      confirmed: { variant: 'default' as const, label: 'Confirmed' },
      shipped: { variant: 'default' as const, label: 'Shipped' },
      delivered: { variant: 'default' as const, label: 'Delivered' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' },
    };
    
    return (
      <Badge variant={statusConfig[status as keyof typeof statusConfig]?.variant || 'secondary'}>
        {statusConfig[status as keyof typeof statusConfig]?.label || status}
      </Badge>
    );
  };

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
                      <p className="text-xl font-bold mt-2">${order.total_amount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
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
