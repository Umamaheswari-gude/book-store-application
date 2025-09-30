import { render, screen, fireEvent } from "@testing-library/react";
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

  test("calls addToCart when Add button clicked", () => {
    const addMock = jest.fn();
    render(<BookList books={mockBooks} addToCart={addMock} removeFromCart={jest.fn()} cart={[]} />);
    fireEvent.click(screen.getAllByText("Add")[0]); 
    expect(addMock).toHaveBeenCalledWith(mockBooks[0]);
  });

  test("calls removeFromCart when Remove button clicked", () => {
    const removeMock = jest.fn();
    render(<BookList books={mockBooks} addToCart={jest.fn()} removeFromCart={removeMock} cart={[]} />);
    fireEvent.click(screen.getAllByText("Remove")[1]); 
    expect(removeMock).toHaveBeenCalledWith("2");
  });
});
