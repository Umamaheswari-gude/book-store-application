import { render, screen, fireEvent } from "@testing-library/react";
import  Application from "../bookStore";
import { MemoryRouter } from "react-router-dom";
import { WishlistProvider } from "../context/wishlistContext";

jest.mock("../utils/api", () => ({
  useBooks: jest.fn(),
}));
jest.mock("../context/cartContext", () => ({
  useCart: jest.fn(),
}));

const mockBooks = [
  { id: "1", bookName: "Harry Potter", author: "J.K. Rowling" },
  { id: "2", bookName: "Atomic Habits", author: "James Clear" },
];

const renderBook = () =>
  render(
    <MemoryRouter>
      <WishlistProvider>
        <Application />
      </WishlistProvider>
    </MemoryRouter>
  );

describe("Application Component", () => {
  beforeEach(() => {
    const { useBooks } = require("../utils/api");
    const { useCart } = require("../context/cartContext");
    (useBooks as jest.Mock).mockReturnValue(mockBooks);
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      increaseQty: jest.fn(),
      decreaseQty: jest.fn(),
    });
  });

  test("filters books based on search input", () => {
    renderBook();
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: "harry" } });
    expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument();
    expect(screen.queryByText(/Atomic Habits/i)).not.toBeInTheDocument();
  });

  test("calls addToCart when a book is added", () => {
    const { useCart } = require("../context/cartContext");
    const mockAddToCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: mockAddToCart,
      removeFromCart: jest.fn(),
      increaseQty: jest.fn(),
      decreaseQty: jest.fn(),
    });
    renderBook();

    const addButton = screen.getAllByText(/add to cart/i)[0];
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalled();
  });

  test("increases quantity when increaseQty is called", () => {
    const { useCart } = require("../context/cartContext");
    const mockIncreaseQty = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: "1", bookName: "Harry Potter", author: "J.K. Rowling", quantity: 1 }],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      increaseQty: mockIncreaseQty,
      decreaseQty: jest.fn(),
    });
    renderBook();

    const increaseButton = screen.getByText("+");
    fireEvent.click(increaseButton);
    expect(mockIncreaseQty).toHaveBeenCalledWith("1");
  });

  test("decreases quantity when decreaseQty is called", () => {
    const { useCart } = require("../context/cartContext");
    const mockDecreaseQty = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: "1", bookName: "Harry Potter", author: "J.K. Rowling", quantity: 2 }],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      increaseQty: jest.fn(),
      decreaseQty: mockDecreaseQty,
    });
    renderBook();
    const decreaseButton = screen.getByText("-");
    fireEvent.click(decreaseButton);
    expect(mockDecreaseQty).toHaveBeenCalledWith("1");
  });

});




















