
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Smartphone, Headphones, Camera, Watch, Gamepad2 } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      icon: Laptop,
      name: 'Computers',
      count: 45,
      color: 'bg-blue-500',
    },
    {
      icon: Smartphone,
      name: 'Mobile Phones',
      count: 32,
      color: 'bg-green-500',
    },
    {
      icon: Headphones,
      name: 'Audio',
      count: 28,
      color: 'bg-purple-500',
    },
    {
      icon: Camera,
      name: 'Photography',
      count: 19,
      color: 'bg-red-500',
    },
    {
      icon: Watch,
      name: 'Wearables',
      count: 15,
      color: 'bg-orange-500',
    },
    {
      icon: Gamepad2,
      name: 'Gaming',
      count: 23,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of products across different categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:transform hover:scale-105"
              >
                <div className={`${category.color} p-3 rounded-lg mb-4 inline-flex group-hover:shadow-lg transition-shadow`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.count} products
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
