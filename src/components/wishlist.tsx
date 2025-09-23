import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/cartContext";
import "./wishlist.css";
import { useAuth } from "../context/userAuthentication";

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const { cart, addToCart, removeFromCart } = useCart();
     const { currentUser } = useAuth();
    if (!currentUser) {
       return <p>Please log in to view your wishlist.</p>; 
    }
  return (
    <div>
       <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>Wishlist</h1>
          {currentUser && (
            <div className="user-block">
              <div className="user-name">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="user-email">{currentUser.email}</div>
            </div>
          )}
        </div>
         <div className="wishlist-grid">
          {wishlist.length === 0 ? (
            <p>No books in wishlist yet</p>
          ) : (
            wishlist.map((book) => {
              const inCart = cart.some((c) => c.id === book.id);
              return (
                <div key={book.id} className="wishlist-card">
                  <img src={book.bookImage} alt={book.bookName} />
                  <h4>{book.bookName}</h4>
                  <p className="author">{book.author}</p>
                  <p className="price">₹{book.price}</p>
                  <div className="card-actions">
                    <button
                      onClick={() =>
                        inCart ? removeFromCart(book.id) : addToCart(book)
                      }
                      className={inCart ? "remove" : "cart"}
                    >
                      {inCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      </div>
  )}
export default Wishlist;






































