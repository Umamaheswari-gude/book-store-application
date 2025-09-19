import BookList from "./components/bookList";
import "./bookStore.css";
import { useBooks } from "./utils/api";
import  { useState } from "react";
import { Book, CartItem } from "./types/types";
import Cart from "./components/cart";
import Navbar from "./components/navbar";



function Application() {
  const books = useBooks();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (book: Book) => {
    setCart((prev) => {
    return [...prev, { ...book, quantity: 1 }];
    });
  };
  
  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
  };

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <div className="head">
     <Navbar search={search} setSearch={setSearch} />
      <div className="main-content">
        <BookList  books={filteredBooks} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />
        <Cart
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      </div>
    </div>
  );
}

export default Application;
