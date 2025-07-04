
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/useProducts';

const ProductGrid = () => {
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts(8);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products from top brands
            </p>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products from top brands at competitive prices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              originalPrice={product.original_price ? Number(product.original_price) : undefined}
              image={product.images?.[0] || '/placeholder.svg'}
              rating={product.average_rating || 0}
              reviews={product.review_count || 0}
              inStock={product.stock_quantity > 0}
              brand={product.brands?.name}
              category={product.categories?.name}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
