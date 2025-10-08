import BookList from "./components/bookList";
import "./bookStore.css";
import { useBooks } from "./utils/api";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import { useCart } from "./context/cartContext"; 
import React, { useMemo } from "react";

function Application() {
  const books = useBooks();
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty } = useCart(); 
  const [search, setSearch] = React.useState("");

  const filteredBooks = useMemo(() => {
    if (!search) {
      return books;
    }

    return books.filter(
      (book) =>
        book.bookName.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);
    
  return (
    <div className="head">
      <Navbar search={search} setSearch={setSearch} />
      <div className="main-content">
        <BookList
          books={filteredBooks}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
        <Cart
          cart={cart}
          increaseQty={(id) => increaseQty(id)}
          decreaseQty={(id) => decreaseQty(id)}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
}
export default Application;
