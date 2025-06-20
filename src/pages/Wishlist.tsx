
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-sm text-gray-500">({items.length} items)</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Start adding products you love to your wishlist</p>
            <Link to="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                
                <div className="p-4 space-y-3">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="text-lg font-bold text-gray-900">
                    Ksh {item.price.toLocaleString()}
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
