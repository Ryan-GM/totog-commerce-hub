import React from 'react';
import { format } from 'date-fns';
import { Package, Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrderTracking, getStatusLabel } from '@/hooks/useOrderTracking';
import { cn } from '@/lib/utils';

interface OrderTrackerProps {
  tracking: OrderTracking[];
  className?: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  const iconClass = "h-4 w-4";
  
  switch (status) {
    case 'order_placed':
      return <CheckCircle className={cn(iconClass, "text-green-500")} />;
    case 'processing':
      return <Clock className={cn(iconClass, "text-yellow-500")} />;
    case 'shipped':
      return <Package className={cn(iconClass, "text-blue-500")} />;
    case 'out_for_delivery':
      return <Truck className={cn(iconClass, "text-orange-500")} />;
    case 'delivered':
      return <CheckCircle className={cn(iconClass, "text-green-600")} />;
    case 'cancelled':
      return <AlertCircle className={cn(iconClass, "text-red-500")} />;
    default:
      return <Clock className={cn(iconClass, "text-gray-400")} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'order_placed':
      return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'shipped':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'out_for_delivery':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'delivered':
      return 'bg-green-600/10 text-green-700 border-green-600/20';
    case 'cancelled':
      return 'bg-red-500/10 text-red-600 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};

export const OrderTracker: React.FC<OrderTrackerProps> = ({ tracking, className }) => {
  if (!tracking || tracking.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No tracking information available
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStatus = tracking[tracking.length - 1];
  const sortedTracking = [...tracking].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Tracking
        </CardTitle>
        {currentStatus.tracking_number && (
          <div className="text-sm text-muted-foreground">
            Tracking Number: <span className="font-mono">{currentStatus.tracking_number}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <StatusIcon status={currentStatus.status} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor(currentStatus.status)}>
                {getStatusLabel(currentStatus.status)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {format(new Date(currentStatus.created_at), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
            {currentStatus.status_message && (
              <p className="text-sm text-muted-foreground mt-1">
                {currentStatus.status_message}
              </p>
            )}
            {currentStatus.location && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {currentStatus.location}
              </div>
            )}
          </div>
        </div>

        {/* Estimated Delivery */}
        {currentStatus.estimated_delivery && currentStatus.status !== 'delivered' && (
          <div className="p-4 rounded-lg border border-dashed">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Estimated Delivery:</span>
              <span className="text-muted-foreground">
                {format(new Date(currentStatus.estimated_delivery), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        )}

        {/* Timeline */}
        {sortedTracking.length > 1 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Tracking History
              </h4>
              <div className="space-y-4">
                {sortedTracking.reverse().map((item, index) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2",
                        index === 0 ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted-foreground"
                      )}>
                        <StatusIcon status={item.status} />
                      </div>
                      {index < sortedTracking.length - 1 && (
                        <div className="w-0.5 h-6 bg-muted-foreground/30 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {getStatusLabel(item.status)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(item.created_at), 'MMM dd, HH:mm')}
                        </span>
                      </div>
                      {item.status_message && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.status_message}
                        </p>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};