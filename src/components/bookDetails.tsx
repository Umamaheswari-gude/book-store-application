import React from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../utils/api";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const books = useBooks();
  const book = books.find((book) => book.id === id);
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.bookImage} alt={book.bookName} />
      </div>
      
      </div>
  );
};
export default BookDetails;
