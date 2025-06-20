
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  // Sample product data
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 85,
      inStock: true,
    },
    {
      id: '3',
      name: 'Ergonomic Office Chair',
      price: 449.99,
      originalPrice: 599.99,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 92,
      inStock: false,
    },
    {
      id: '4',
      name: 'Portable Laptop Stand',
      price: 79.99,
      image: '/placeholder.svg',
      rating: 4.3,
      reviews: 156,
      inStock: true,
    },
    {
      id: '5',
      name: 'Wireless Charging Station',
      price: 89.99,
      originalPrice: 119.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 203,
      inStock: true,
    },
    {
      id: '6',
      name: 'Bluetooth Speaker Pro',
      price: 159.99,
      image: '/placeholder.svg',
      rating: 4.4,
      reviews: 174,
      inStock: true,
    },
    {
      id: '7',
      name: 'Gaming Mechanical Keyboard',
      price: 129.99,
      originalPrice: 179.99,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 267,
      inStock: true,
    },
    {
      id: '8',
      name: 'HD Webcam with Microphone',
      price: 99.99,
      image: '/placeholder.svg',
      rating: 4.2,
      reviews: 89,
      inStock: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, 
            innovation, and value to enhance your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
