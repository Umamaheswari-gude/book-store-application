import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Cart from "../../components/cart";

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
const mockNavigate = useNavigate as jest.Mock;

describe("Cart Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });
  
  test("show empty cart message", () => {
    render(
      <MemoryRouter>
        <Cart
          cart={[]}
          increaseQty={jest.fn()}
          decreaseQty={jest.fn()}
          removeFromCart={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/no items in cart/i)).toBeInTheDocument();
  });
});









