
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import ProductGrid from '@/components/products/ProductGrid';
import FeaturesSection from '@/components/home/FeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <ProductGrid />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
