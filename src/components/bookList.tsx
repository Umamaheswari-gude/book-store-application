import React from "react";
import { Book } from "../types/types";
import BookCard from "./bookCard";
import "./bookList.css";

type BookListProps = {
  books: Book[];
};
const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book}  /> 
      ))}
    </div>
  );
};
export default BookList;