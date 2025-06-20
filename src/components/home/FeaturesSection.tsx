
import React from 'react';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on all orders over $50',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payment information is safe with us',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Pay with Stripe, PayPal, or M-PESA',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TotoG?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-full ${feature.color} mb-4 group-hover:shadow-lg transition-shadow`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
