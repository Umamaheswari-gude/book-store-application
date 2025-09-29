import React from "react";
import { Book, CartItem } from "../types/types";
import BookCard from "./bookCard";
import "../styles/bookList.css";

type BookListProps = {
  books: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  cart: CartItem[];
};

const BookList: React.FC<BookListProps> = ({ books, addToCart, removeFromCart, cart }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book}  addToCart={addToCart} removeFromCart={removeFromCart} cart={cart}  /> 
      ))}
    </div>
  );
};
export default BookList;