import React from "react";
import { Book } from "../types/types";

type BookCardProps = {
  book: Book;

};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.bookImage} alt={book.bookName} />
      <h3>{book.bookName}</h3>
      <p>{book.author}</p>
      <p>{book.price}</p>
    </div>
  );
};
export default BookCard;