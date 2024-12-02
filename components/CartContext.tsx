import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context
interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the provider
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState<any>(); // Initial cart count

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for consuming the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
