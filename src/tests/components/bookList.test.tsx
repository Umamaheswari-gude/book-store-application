import React from "react";
import { render, screen } from "@testing-library/react";
import { Book } from "../../types/types";
import BookList from "../../components/bookList";

jest.mock("../../components/bookCard", () => ({
  __esModule: true,
  default: ({ book, addToCart, removeFromCart }: any) => (
    <div data-testid="book-card">
      <h3>{book.bookName}</h3>
      <button onClick={() => addToCart(book)}>Add</button>
      <button onClick={() => removeFromCart(book.id)}>Remove</button>
    </div>
  ),
}));
const mockBooks: Book[] = [
  {
      id: "1", bookName: "Death", author: "Sadhguru", price: 500, bookImage: "death.jpg",
      description: ""
  },
  {
      id: "2", bookName: "The Secret", author: "Rhonda", price: 300, bookImage: "secret.jpg",
      description: ""
  },
];

describe("BookList Component", () => {
  test("displays correct number of BookCard components", () => {
    render(<BookList books={mockBooks} addToCart={jest.fn()} removeFromCart={jest.fn()} cart={[]} />);
    expect(screen.getAllByTestId("book-card")).toHaveLength(2);
  });
});
