import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookDetails from "../../components/bookDetails";

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

jest.mock("../../context/cartContext", () => ({
  useCart: () => ({
    cart: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  }),
}));
jest.mock("../../context/wishlistContext", () => ({
  useWishlist: () => ({
    wishlist: [],
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
  }),
}));
jest.mock("../../utils/api", () => ({
  useBooks: () => [
    {
      id: "1",
      bookName: "The tale teller",
      author: "Anne",
      price: 500,
      description: "Fifth novel in leaphorn",
      bookImage: "test.png",
    },
  ],
}));
describe("BookDetails Component", () => {
  
  test("shows Add to Cart button when not in cart", () => {
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
    render(
      <MemoryRouter initialEntries={["/books/1"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    const wishlistBtn = screen.getByText("♡ Wishlist");
    fireEvent.click(wishlistBtn);
    expect(wishlistBtn).toBeInTheDocument();
  });
});