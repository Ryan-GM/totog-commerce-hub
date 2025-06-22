
import React, { createContext, useContext } from 'react';
import { useCart as useCartHook } from '@/hooks/useCart';

interface CartContextType {
  items: any[];
  total: number;
  itemCount: number;
  addItem: (item: { id: string; name: string; price: number; image: string }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    items, 
    total, 
    itemCount, 
    addToCart, 
    updateQuantity: updateCartQuantity, 
    removeFromCart, 
    clearCart: clearCartItems,
    isLoading 
  } = useCartHook();

  const addItem = (item: { id: string; name: string; price: number; image: string }) => {
    addToCart({ productId: item.id, quantity: 1 });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const cartItem = items.find(item => item.id === id);
    if (cartItem) {
      updateCartQuantity({ cartId: cartItem.cartId, quantity });
    }
  };

  const removeItem = (id: string) => {
    const cartItem = items.find(item => item.id === id);
    if (cartItem) {
      removeFromCart(cartItem.cartId);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      total,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: clearCartItems,
      isLoading,
    }}>
      {children}
    </CartContext.Provider>
  );
};
