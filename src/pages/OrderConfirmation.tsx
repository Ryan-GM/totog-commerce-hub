
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <p className="text-gray-600 mb-8">We couldn't find your order details.</p>
          <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { items, total, billingInfo, paymentMethod, orderId } = orderDetails;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <p className="text-gray-600">Order ID: {orderId}</p>
            </div>

            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total (including tax):</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Billing & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Billing Address
              </h3>
              <div className="space-y-1 text-gray-600">
                <p>{billingInfo.firstName} {billingInfo.lastName}</p>
                <p>{billingInfo.address}</p>
                <p>{billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}</p>
                <p>{billingInfo.email}</p>
                {billingInfo.phone && <p>{billingInfo.phone}</p>}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </h3>
              <div className="text-gray-600">
                <p className="capitalize">{paymentMethod.replace('-', ' ')}</p>
                <p className="text-sm text-green-600 font-medium">✓ Payment Confirmed</p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Shipping Information
            </h3>
            <div className="text-gray-600">
              <p>Your order will be shipped to the billing address above.</p>
              <p className="text-sm mt-2">Estimated delivery: 3-5 business days</p>
              <p className="text-sm text-green-600 font-medium">Free shipping applied</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/products')}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => navigate('/order-history')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              View My Orders
            </Button>
            {orderDetails.orderDbId && (
              <Button 
                onClick={() => navigate(`/order-tracking/${orderDetails.orderDbId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Track Order
              </Button>
            )}
            <Button 
              onClick={() => navigate('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              Return Home
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
