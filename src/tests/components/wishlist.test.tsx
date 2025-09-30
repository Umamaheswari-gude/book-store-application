import { render, screen, fireEvent } from "@testing-library/react";
import { useWishlist } from "../../context/wishlistContext";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/userAuthentication";
import Wishlist from "../../components/wishlist";

jest.mock("../../context/wishlistContext");
jest.mock("../../context/cartContext");
jest.mock("../../context/userAuthentication");
const mockUseWishlist = useWishlist as jest.Mock;
const mockUseCart = useCart as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

const sampleBook = {
  id: "1",
  bookName: "Death",
  author: "Sadhguru",
  price: 100,
  bookImage: "death.jpg",
};

describe("Wishlist Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("display login message when no user is logged in", () => {
    mockUseAuth.mockReturnValue({ currentUser: null });
    mockUseWishlist.mockReturnValue({ wishlist: [] });
    mockUseCart.mockReturnValue({ cart: [], addToCart: jest.fn(), removeFromCart: jest.fn() });
    render(<Wishlist />);
    expect(screen.getByText(/Please log in to view your wishlist/i)).toBeInTheDocument();
  });

  test("display wishlist with book and allows adding to cart", () => {
    const addToCart = jest.fn();
    mockUseAuth.mockReturnValue({
      currentUser: { firstName: "mahi", lastName: "gude", email: "mahi@gmail.com" },
    });
    mockUseWishlist.mockReturnValue({ wishlist: [sampleBook], addToWishlist: jest.fn(), removeFromWishlist: jest.fn() });
    mockUseCart.mockReturnValue({ cart: [], addToCart, removeFromCart: jest.fn() });
    render(<Wishlist />);
    expect(screen.getByText("Death")).toBeInTheDocument();
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Add to Cart/i }));
    expect(addToCart).toHaveBeenCalledWith(sampleBook);
  });
  
  test("Removing book from cart", () => {
    const removeFromCart = jest.fn();
    mockUseAuth.mockReturnValue({
      currentUser: { firstName: "Mahi", lastName: "gude", email: "mahi@gmail.com" },
    });
    mockUseWishlist.mockReturnValue({ wishlist: [sampleBook] });
    mockUseCart.mockReturnValue({
      cart: [{ ...sampleBook, quantity: 1 }],
      addToCart: jest.fn(),
      removeFromCart,
    });
    render(<Wishlist />);
    expect(screen.getByText("Remove from Cart")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Remove from Cart/i }));
    expect(removeFromCart).toHaveBeenCalledWith("1");
  });
});




















