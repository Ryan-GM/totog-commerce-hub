import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { useRealtimeOrderTracking } from '@/hooks/useRealtimeOrderTracking';
import { OrderTracker } from '@/components/orders/OrderTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  
  const { data: tracking, isLoading, error, refetch } = useOrderTracking(orderId);
  const { trackingUpdates } = useRealtimeOrderTracking(orderId);

  // Show toast when new tracking updates arrive via realtime
  useEffect(() => {
    if (trackingUpdates.length > 0) {
      const latestUpdate = trackingUpdates[trackingUpdates.length - 1];
      toast({
        title: "Order Status Updated",
        description: latestUpdate.status_message || `Order status updated to ${latestUpdate.status}`,
      });
    }
  }, [trackingUpdates, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/order-history">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Order Tracking</h1>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-lg font-medium text-destructive">
                  Unable to load tracking information
                </div>
                <p className="text-muted-foreground">
                  {error.message || 'There was an error loading the tracking information.'}
                </p>
                <Button onClick={() => refetch()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!tracking || tracking.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/order-history">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Order Tracking</h1>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-lg font-medium">
                  No tracking information available
                </div>
                <p className="text-muted-foreground">
                  Tracking information for this order is not available yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/order-history">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Order Tracking</h1>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <OrderTracker tracking={tracking} />
      </div>
    </div>
  );
};