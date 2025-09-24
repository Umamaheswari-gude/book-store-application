import React from "react";
import { Book, CartItem } from "../types/types";
import "./bookCard.css";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";

type BookCardProps = {
  book: Book;
  addToCart?: (book: Book) => void;
  removeFromCart?: (bookId: string) => void;
  cart?: CartItem[];
};

const BookCard: React.FC<BookCardProps> = ({ book, addToCart: propAdd, removeFromCart: propRemove, cart: propCart }) => {

  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const cartList = propCart ?? cart;
  const handleAdd = propAdd ?? addToCart;
  const handleRemove = propRemove ?? removeFromCart;
  const inCart = cartList.some((c) => c.id === book.id);
  const inWishlist = wishlist.some((w) => w.id === book.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <div className="book-card">
      <img src={book.bookImage} alt={book.bookName} />
      <h3>{book.bookName}</h3>
      <p className="author">{book.author}</p>
      <p className="price">₹{book.price}</p>
      <div className="actions">
        <button
          className={`cart-button ${inCart ? "remove" : "add"}`}
          onClick={() => (inCart ? handleRemove(book.id) : handleAdd(book))}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          className={`wish-button ${inWishlist ? "active" : ""}`}
          onClick={handleWishlistToggle}
        >
          {inWishlist ? "❤️" : "♡"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;