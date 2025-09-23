import React, { createContext, useContext, useState } from "react";
import { Book, CartItem } from "../types/types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]); 

  const addToCart = (book: Book) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === book.id);
      if (found) {
        return prev.map((p) =>
          p.id === book.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};









