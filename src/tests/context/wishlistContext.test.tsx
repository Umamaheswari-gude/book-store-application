import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Book } from "../../types/types";
import { useWishlist, WishlistProvider } from "../../context/wishlistContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WishlistProvider>
    {children}
  </WishlistProvider>
);
const sampleBook: Book = {
  id: "1",
  bookName: "400 Days",
  author: "Chetan bhagat",
  price: 200,
  description: "Wishlist test book",
  bookImage: "wishlist.jpg",
};

describe("WishlistContext", () => {
  test("adds a book to wishlist", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addToWishlist(sampleBook);
    });
    expect(result.current.wishlist).toHaveLength(1);
    expect(result.current.wishlist[0].id).toBe("1");
  });
  
  test("does not add the same book twice", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addToWishlist(sampleBook);
      result.current.addToWishlist(sampleBook);
    });
    expect(result.current.wishlist).toHaveLength(1);
  });

  test("removes a book from wishlist", () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    act(() => {
      result.current.addToWishlist(sampleBook);
      result.current.removeFromWishlist("1");
    });
    expect(result.current.wishlist).toHaveLength(0);
  });

  test("useWishlist throws error if used outside provider", () => {
    const { result } = renderHook(() => {
      try {
        return useWishlist();
      } catch (err: any) {
        return err;
      }
    });
    expect(result.current).toEqual(
      new Error("useWishlist must be used inside WishlistProvider")
    );
  });
});




















