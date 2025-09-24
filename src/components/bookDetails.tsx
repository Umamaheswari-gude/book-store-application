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
      <div className="book-info">
        <h2>{book.bookName}</h2>
        <h4>{book.author}</h4>
        <p className="price">₹{book.price}</p>
        <h3>Description</h3>
        <p>{book.description}</p>         
          
        </div>
      </div>
  );
};
export default BookDetails;
