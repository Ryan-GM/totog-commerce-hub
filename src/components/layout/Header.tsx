
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const navigate = useNavigate();
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl hidden sm:block">TotoG Commerce</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/wishlist')}
          >
            <Heart className="h-5 w-5" />
            {wishlistItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                {wishlistItemCount}
              </Badge>
            )}
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
