
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, Smartphone, Headphones, Camera, Watch, Gamepad2,
  Shirt, ShoppingBag, Home, Utensils, Bed, Hammer,
  Heart, Dumbbell, Car, Book, Baby, PawPrint,
  Wrench, Gift, Plane, TreePine, Sparkles, Glasses,
  Package, Monitor, Shield, Router, Download, Sofa,
  Lightbulb, ChefHat, Bath, Leaf, Settings, Spray,
  Activity, Mountain, Pill, Zap, Music, Newspaper,
  Puzzle, Palette, Apple, Coffee, ShoppingCart, School,
  BrainCircuit, HardHat, TestTube, CreditCard, MapPin
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCategories } from '@/hooks/useProducts';

const Categories = () => {
  const { data: categories = [], isLoading } = useCategories();
  
  // Icon mapping for categories
  const categoryIconMap: { [key: string]: any } = {
    'Laptops & Computers': Laptop,
    'Smartphones & Tablets': Smartphone,
    'TV & Audio': Monitor,
    'Cameras & Photography': Camera,
    'Gaming': Gamepad2,
    'Smart Home & Security': Shield,
    'Networking & Internet': Router,
    'Software & Digital': Download,
    'Mens Fashion': Shirt,
    'Womens Fashion': Sparkles,
    'Kids & Baby Fashion': Baby,
    'Shoes': Glasses,
    'Bags & Luggage': ShoppingBag,
    'Watches & Jewelry': Watch,
    'Beauty & Personal Care': Heart,
    'Hair Care & Styling': Sparkles,
    'Furniture': Sofa,
    'Home Decor': Lightbulb,
    'Kitchen & Dining': ChefHat,
    'Bedding & Bath': Bath,
    'Garden & Outdoor': TreePine,
    'Home Improvement': Hammer,
    'Cleaning & Laundry': Spray,
    'Health & Wellness': Activity,
    'Sports & Fitness': Dumbbell,
    'Outdoor Recreation': Mountain,
    'Nutrition & Supplements': Pill,
    'Car Parts & Accessories': Car,
    'Motorcycles & Parts': Zap,
    'Car Electronics': Monitor,
    'Tools & Equipment': Settings,
    'Books': Book,
    'Movies & TV Shows': Monitor,
    'Music': Music,
    'Magazines & Newspapers': Newspaper,
    'Toys & Games': Puzzle,
    'Educational Toys': BrainCircuit,
    'Action Figures & Collectibles': Package,
    'Arts & Crafts': Palette,
    'Groceries': Apple,
    'Beverages': Coffee,
    'Gourmet & Specialty Foods': ChefHat,
    'Organic & Natural': Leaf,
    'Baby Care': Baby,
    'Baby Gear': ShoppingCart,
    'Maternity': Heart,
    'School & Office Supplies': School,
    'Pet Food': PawPrint,
    'Pet Accessories': PawPrint,
    'Pet Health': Activity,
    'Industrial Equipment': HardHat,
    'Laboratory Supplies': TestTube,
    'Safety Equipment': Shield,
    'Gift Cards': CreditCard,
    'Services': Gift,
    'Travel & Tourism': MapPin
  };

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-orange-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
    'bg-yellow-500', 'bg-cyan-500', 'bg-rose-500', 'bg-emerald-500'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete range of product categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = categoryIconMap[category.name] || Package;
            const colorClass = colors[index % colors.length];
            
            return (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:transform hover:scale-105 border border-gray-100"
              >
                <div className={`${colorClass} p-3 rounded-lg mb-4 inline-flex group-hover:shadow-lg transition-shadow`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        {/* No Categories State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Categories will appear here once they are added.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
