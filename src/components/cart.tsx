import React from "react";
import { CartItem } from "../types/types";
import "./cart.css";

type CartProps = {
  cart: CartItem[];
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
};
const Cart: React.FC<CartProps> = ({
  cart,
  increaseQty,
  decreaseQty,
}) => {

  return (
    <div className="cart">
      <h2>Your Cart</h2>
     
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.bookImage} alt={item.bookName} />
          <div>
            <h4>{item.bookName}</h4>
            <p>{item.author}</p>
            <p>₹{item.price}</p>
            <div className="cart-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;
