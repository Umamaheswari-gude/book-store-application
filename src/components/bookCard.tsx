import React from "react";
import { Book, CartItem } from "../types/types";
import "./bookCard.css";

type BookCardProps = {
  book: Book;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  cart: CartItem[];

};

const BookCard: React.FC<BookCardProps> = ({ book, addToCart, removeFromCart, cart }) => {
    const isAdded = cart.some(item => item.id === book.id);
const handleButtonClick = () => {
    if (isAdded) {
      removeFromCart(book.id);
    } else {
      addToCart(book);
    }
  };
  
  return (
    <div className="book-card">
      <img src={book.bookImage} alt={book.bookName} />
      <h3>{book.bookName}</h3>
      <p>{book.author}</p>
      <p>{book.price}</p>
      <button onClick={handleButtonClick}
      className={`cart-button ${isAdded ? 'remove' : 'add'}`}>
        {isAdded ? 'Remove from cart' : 'Add To Cart'}
      </button>
    </div>
  );
};
export default BookCard;