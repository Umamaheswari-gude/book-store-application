import React, { createContext, useContext, useState } from "react";
import { Book } from "../types/types";

type WishlistContextType = {
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  const addToWishlist = (book: Book) => {
    setWishlist((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };
   const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};

