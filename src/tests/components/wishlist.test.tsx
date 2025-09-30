import { render, screen } from "@testing-library/react";
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
});




















