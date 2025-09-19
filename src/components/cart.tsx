import React from "react";
import { CartItem } from "../types/types";
import './cart.css'

type CartProps = {
  cart: CartItem[];
  removeFromCart?: (bookId: number) => void;
};

const Cart: React.FC<CartProps> = ({
  cart,
  
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
            <p>{item.price}</p>
          </div>
        </div>
      ))}
     
    </div>
  );
};
export default Cart;


