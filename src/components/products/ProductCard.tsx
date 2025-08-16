
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  brand?: string;
  category?: string;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating = 0, 
  reviews = 0, 
  inStock,
  brand,
  category
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatCurrency } = useCurrency();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = () => {
    if (!inStock) return;
    
    addItem({
      id,
      name,
      price,
      image,
    });
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(id);
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist.`,
      });
    }
  };


  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discount}% OFF
            </span>
          )}
          {!inStock && (
            <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand & Category */}
        {(brand || category) && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {brand && <span className="font-medium">{brand}</span>}
            {brand && category && <span>•</span>}
            {category && <span>{category}</span>}
          </div>
        )}

        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${
                  i < Math.floor(rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating > 0 ? `${rating.toFixed(1)}` : '0.0'} ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${
            inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
          {inStock && (
            <span className="text-xs text-gray-500">
              Available now
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
