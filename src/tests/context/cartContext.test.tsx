import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Book } from "../../types/types";
import { CartProvider, useCart } from "../../context/cartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    {children}
  </CartProvider>
);
const sampleBook: Book = {
  id: "1",
  bookName: "Test Book",
  author: "Author",
  price: 100,
  description: "A test book",
  bookImage: "test.jpg",
};
describe("CartContext", () => {
    
  test("adds a book to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleBook);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toMatchObject({ id: "1", quantity: 1 });
  });

  test("increases quantity when same book is added again", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleBook);
      result.current.addToCart(sampleBook);
    });
    expect(result.current.cart[0].quantity).toBe(2);
  });

  test("removes a book from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleBook);
      result.current.removeFromCart("1");
    });
    expect(result.current.cart).toHaveLength(0);
  });

  test("decreases item quantity and removes when zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleBook); 
      result.current.decreaseQty("1"); 
    });
    expect(result.current.cart).toHaveLength(0);
  });
});




















