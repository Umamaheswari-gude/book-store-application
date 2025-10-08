import { render, screen, fireEvent } from "@testing-library/react";
import { Book, CartItem } from "../../types/types";
import BookCard from "../../components/bookCard";
import { useWishlist } from "../../context/wishlistContext";
import {  useCart } from "../../context/cartContext";

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    console.warn(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
const mockNavigate = jest.fn();


jest.mock("../../context/cartContext", () => ({
  useCart: jest.fn(),
}));
jest.mock("../../context/wishlistContext", () => ({
  useWishlist: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const sampleBook: Book = {
    id: "1",
    bookName: "Harry Potter",
    author: "J.K. Rowling",
    price: 500,
    bookImage: "hp.jpg",
    description: ""
};

describe("BookCard Component", () => {
  let addToCart: jest.Mock;
  let removeFromCart: jest.Mock;
  let addToWishlist: jest.Mock;
  let removeFromWishlist: jest.Mock;
  beforeEach(() => {
    addToCart = jest.fn();
    removeFromCart = jest.fn();
    addToWishlist = jest.fn();
    removeFromWishlist = jest.fn();
    mockNavigate.mockClear();
  });
  function setup(cart: CartItem[] = [], wishlist: Book[] = []) {
    const { useCart } = require("../../context/cartContext");
    const { useWishlist } = require("../../context/wishlistContext");
    useCart.mockReturnValue({
      cart,
      addToCart,
      removeFromCart,
    });
    useWishlist.mockReturnValue({
      wishlist,
      addToWishlist,
      removeFromWishlist,
    });
    render(<BookCard book={sampleBook} />);
  }

  test("display book details", () => {
    setup();
    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
    expect(screen.getByText("₹500")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Harry Potter" })).toBeInTheDocument();
  });
  
  test("adds to cart when not in cart", () => {
    setup([]); 
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(addToCart).toHaveBeenCalledWith(sampleBook);
  });

  test("removes from cart when already in cart", () => {
    setup([{ ...sampleBook, quantity: 1 }]); 
    fireEvent.click(screen.getByText("Remove from Cart"));
    expect(removeFromCart).toHaveBeenCalledWith("1");
  });

  test("adds to wishlist when not in wishlist", () => {
    setup([], []); 
    fireEvent.click(screen.getByText("♡"));
    expect(addToWishlist).toHaveBeenCalledWith(sampleBook);
  });

  test("removes from wishlist when already in wishlist", () => {
  (useWishlist as jest.Mock).mockReturnValue({
    wishlist: [sampleBook],
    addToWishlist: jest.fn(),
    removeFromWishlist,
  });
  (useCart as jest.Mock).mockReturnValue({
    cart: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  });
  render(<BookCard book={sampleBook} />);
  const button = screen.getByText("❤️");
  fireEvent.click(button);
  expect(removeFromWishlist).toHaveBeenCalledWith(sampleBook.id);
});  

test("navigates to book details page when the image is clicked", () => {
    setup();

    const bookImage = screen.getByRole("img", { name: sampleBook.bookName });
    fireEvent.click(bookImage);
    expect(mockNavigate).toHaveBeenCalledWith(`/books/${sampleBook.id}`);
});
});
