import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetails from "../../components/bookDetails";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";
import { useBooks } from "../../utils/api";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation((...args) => {
    if (typeof args[0] === "string" && args[0].includes("React Router Future Flag Warning")) {
      return;
    }
    console.warn(...args);
  });
});
afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock("../../context/cartContext");
jest.mock("../../context/wishlistContext");
jest.mock("../../utils/api");

const mockBook = {
  id: "1",
  bookName: "The tale teller",
  author: "Anne",
  price: 500,
  description: "Fifth novel in leaphorn",
  bookImage: "test.png",
};

describe("BookDetails Component", () => {
  beforeEach(() => {
    (useBooks as jest.Mock).mockReturnValue([mockBook]);
  });

  test("shows Add to Cart button when not in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  test("handles wishlist button click", () => {
    const addToWishlist = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist,
      removeFromWishlist: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const wishlistBtn = screen.getByText("♡ Wishlist");
    fireEvent.click(wishlistBtn);
    expect(addToWishlist).toHaveBeenCalledWith(mockBook);
  });

  test("displays Book not found when invalid id", () => {
    (useBooks as jest.Mock).mockReturnValue([]); 
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/books/999"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Book not found!")).toBeInTheDocument();
  });

  test("display Add to Cart and calls addToCart when not in cart", () => {
    const addToCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart,
      removeFromCart: jest.fn(),
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(mockBook);
  });

  test("display Remove from Cart and calls removeFromCart when in cart", () => {
    const removeFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockBook],
      addToCart: jest.fn(),
      removeFromCart,
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /remove from cart/i });
    fireEvent.click(button);
    expect(removeFromCart).toHaveBeenCalledWith("1");
  });

  test("displays '♡ Wishlist' and calls addToWishlist when not in wishlist", () => {
    const addToWishlist = jest.fn();
      (useCart as jest.Mock).mockReturnValue({
        cart: [],
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
      });
      (useWishlist as jest.Mock).mockReturnValue({
        wishlist: [], 
        addToWishlist,
        removeFromWishlist: jest.fn(),
      });
      render(
        <MemoryRouter initialEntries={["/books/1"]}>
          <Routes>
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </MemoryRouter>
      );
      const button = screen.getByRole("button", { name: /♡ wishlist/i });
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(addToWishlist).toHaveBeenCalledWith(mockBook);
});

  test("displays ':heart:' and calls removeFromWishlist when in wishlist", () => {
    const removeFromWishlist = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlist: [mockBook], 
      addToWishlist: jest.fn(),
      removeFromWishlist,
    });
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /❤️/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(removeFromWishlist).toHaveBeenCalledWith("1");
  });

});
