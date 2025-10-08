import React from "react";
import { CartItem } from "../types/types";
import "../styles/cart.css";
import { useNavigate } from "react-router-dom";
// import { BsCart } from 'react-icons/bs';

type CartProps = {
  cart: CartItem[];
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
};
const Cart: React.FC<CartProps> = ({
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) => {

const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = cart.length > 0 ? 100 :0 ;
const total = subtotal + shipping;
const navigate = useNavigate();

  return (
    <div className="cart">
        <div className="cart-header">
      <h2>Your Cart</h2>
      {/* <h3>
        <a href="" className='text-white text-decoration-none'>
          <BsCart />{cart.length}
        </a>
      </h3> */}
      <button className="wishlist-icon" onClick={() => navigate("/wishlist")}>♡
      </button>
      <h3>🛒{cart.length}</h3></div>
      {cart.length === 0 && <p>No items in cart..</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.bookImage} alt={item.bookName} />   
            <h4>{item.bookName}</h4>
            <p>{item.author}</p>
            <p>₹{item.price}</p>
            <div className="cart-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          
        </div>
      ))}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>     
        <p>Shipping: ₹{shipping.toFixed(2)}</p> 
        <p>Total: ₹{total.toFixed(2)}</p> 
      </div>

    </div>
  );
};
export default Cart;


