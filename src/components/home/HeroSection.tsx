
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const carouselItems = [
    {
      type: 'latest',
      title: 'Latest Products',
      subtitle: 'Discover Our Newest Arrivals',
      description: 'Get the hottest tech gadgets fresh from our collection',
      bgColor: 'from-blue-400 to-purple-500',
      textColor: 'text-white',
      buttonText: 'Shop Latest',
      badge: 'NEW'
    },
    {
      type: 'discount',
      title: 'Big Sale Alert!',
      subtitle: 'Up to 50% Off',
      description: 'Limited time offer on selected electronics',
      bgColor: 'from-red-400 to-orange-500',
      textColor: 'text-white',
      buttonText: 'Shop Sale',
      badge: '50% OFF'
    },
    {
      type: 'special',
      title: 'Black Friday Preview',
      subtitle: 'Coming November 29th',
      description: 'Prepare for our biggest sale of the year',
      bgColor: 'from-gray-800 to-black',
      textColor: 'text-white',
      buttonText: 'Get Notified',
      badge: 'COMING SOON'
    },
    {
      type: 'featured',
      title: 'Premium Collection',
      subtitle: 'Exclusive Products',
      description: 'Handpicked premium items for tech enthusiasts',
      bgColor: 'from-emerald-400 to-teal-500',
      textColor: 'text-white',
      buttonText: 'Explore Premium',
      badge: 'PREMIUM'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">Trusted by 10,000+ customers</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Amazing 
                <span className="text-blue-600"> Products</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Shop from our curated collection of high-quality products. 
                Fast shipping, secure payments, and exceptional customer service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View Categories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className="relative">
            <Carousel className="w-full max-w-lg mx-auto" opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 shadow-2xl relative overflow-hidden`}>
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className={`${item.textColor} space-y-4`}>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                          <p className="text-lg font-semibold opacity-90">{item.subtitle}</p>
                          <p className="text-sm opacity-80">{item.description}</p>
                        </div>
                        
                        {/* Mock Product Preview */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="h-3 bg-white/30 rounded w-20"></div>
                              <div className="h-4 bg-white/50 rounded w-24"></div>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-white/20 rounded w-full"></div>
                            <div className="h-2 bg-white/20 rounded w-3/4"></div>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-2 w-2 fill-yellow-300 text-yellow-300" />
                              ))}
                            </div>
                            <Button size="sm" variant="secondary" className="text-xs h-6">
                              {item.buttonText}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full opacity-50"></div>
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full opacity-30"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/80 hover:bg-white border-0" />
              <CarouselNext className="right-2 bg-white/80 hover:bg-white border-0" />
            </Carousel>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-75"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
