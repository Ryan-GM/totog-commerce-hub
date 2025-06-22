
import React, { createContext, useContext } from 'react';
import { useWishlist as useWishlistHook } from '@/hooks/useWishlist';

interface WishlistContextType {
  items: any[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items, addToWishlist, removeFromWishlist, isLoading } = useWishlistHook();

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isLoading,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
