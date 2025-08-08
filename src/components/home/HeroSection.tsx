
import React from 'react';
import { Link } from 'react-router-dom';
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
      bgColor: 'from-emerald-400 via-teal-500 to-blue-600',
      textColor: 'text-white',
      buttonText: 'Shop Latest',
      badge: 'NEW'
    },
    {
      type: 'discount',
      title: 'Big Sale Alert!',
      subtitle: 'Up to 50% Off',
      description: 'Limited time offer on selected electronics',
      bgColor: 'from-orange-400 via-red-500 to-pink-600',
      textColor: 'text-white',
      buttonText: 'Shop Sale',
      badge: '50% OFF'
    },
    {
      type: 'special',
      title: 'Black Friday Preview',
      subtitle: 'Coming November 29th',
      description: 'Prepare for our biggest sale of the year',
      bgColor: 'from-purple-600 via-indigo-600 to-blue-800',
      textColor: 'text-white',
      buttonText: 'Get Notified',
      badge: 'COMING SOON'
    },
    {
      type: 'featured',
      title: 'Premium Collection',
      subtitle: 'Exclusive Products',
      description: 'Handpicked premium items for tech enthusiasts',
      bgColor: 'from-green-500 via-emerald-500 to-teal-600',
      textColor: 'text-white',
      buttonText: 'Explore Premium',
      badge: 'PREMIUM'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-base text-gray-700 font-medium">Trusted by 10,000+ customers</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Discover Amazing 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Products</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                Shop from our curated collection of high-quality products. 
                Fast shipping, secure payments, and exceptional customer service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg group px-8 py-4 text-lg">
                <Link to="/products" aria-label="Shop products now">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-input text-foreground hover:bg-accent px-8 py-4 text-lg">
                <Link to="/categories" aria-label="Browse product categories">View Categories</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 font-medium">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className="relative flex items-center justify-center">
            <Carousel className="w-full max-w-xl mx-auto" opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className={`bg-gradient-to-br ${item.bgColor} rounded-3xl p-10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between`}>
                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className={`${item.textColor} space-y-6`}>
                        <div className="space-y-3">
                          <h3 className="text-3xl font-bold">{item.title}</h3>
                          <p className="text-xl font-semibold opacity-90">{item.subtitle}</p>
                          <p className="text-base opacity-80">{item.description}</p>
                        </div>
                        
                        {/* Mock Product Preview */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-3">
                              <div className="h-4 bg-white/30 rounded w-24"></div>
                              <div className="h-5 bg-white/50 rounded w-32"></div>
                            </div>
                            <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-white/20 rounded w-full"></div>
                            <div className="h-3 bg-white/20 rounded w-3/4"></div>
                          </div>
                          <div className="flex justify-between items-center pt-3">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                              ))}
                            </div>
                            <Button size="sm" variant="secondary" className="text-sm h-8 px-4">
                              {item.buttonText}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full opacity-50"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full opacity-30"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
            </Carousel>
            
            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-75"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
