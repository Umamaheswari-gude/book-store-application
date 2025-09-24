import React from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../utils/api";
import './bookDetails.css';
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const books = useBooks();
  const { addToCart, cart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const book = books.find((book) => book.id === id);
  if (!book) return <p>Book not found!</p>;
  const inCart = cart.some((c) => c.id === book.id);
  const inWishlist = wishlist.some((w) => w.id === book.id);


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
        <div className="actions">
          <button
            className={`cart-btn-details ${inCart ? "remove" : "add"}`}
            onClick={() =>
              inCart ? removeFromCart(book.id) : addToCart(book)}>
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>       
           <button
            className={`wish-btn ${inWishlist ? "active" : ""}`}
            onClick={() =>
              inWishlist ? removeFromWishlist(book.id) : addToWishlist(book)}>
            {inWishlist ? "❤️" : "♡ Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;


