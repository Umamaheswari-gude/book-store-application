import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

const sampleCart = [
  {
    id: "1",
    title: "Death",
    price: 500,
    quantity: 2,
    image: "death.jpg",
    description: "A wizarding adventure.",
    bookName: "Death",
    author: "Sadhguru",
    bookImage: "death.jpg"
  },
  {
    id: "2",
    title: "The Hobbit",
    price: 300,
    quantity: 1,
    image: "the-hobbit.jpg",
    description: "A hobbit's journey.",
    bookName: "The Hobbit",
    author: "J.R.R. Tolkien",
    bookImage: "the-hobbit.jpg"
  }
];

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

   test("shows cart items and summary correctly", () => {
    render(
      <MemoryRouter>
        <Cart
          cart={sampleCart}
          increaseQty={jest.fn()}
          decreaseQty={jest.fn()}
          removeFromCart={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Death")).toBeInTheDocument();
    expect(screen.getByText("The Hobbit")).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: ₹1300.00/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Shipping: ₹100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: ₹1400.00/i)).toBeInTheDocument();
  });

   test("increaseQty and decreaseQty when buttons clicked", () => {
    const increaseMock = jest.fn();
    const decreaseMock = jest.fn();
    render(
      <MemoryRouter>
        <Cart
          cart={sampleCart}
          increaseQty={increaseMock}
          decreaseQty={decreaseMock}
          removeFromCart={jest.fn()}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getAllByText("+")[0]);
    fireEvent.click(screen.getAllByText("-")[0]);
    expect(increaseMock).toHaveBeenCalledWith("1");
    expect(decreaseMock).toHaveBeenCalledWith("1");
  });

});









