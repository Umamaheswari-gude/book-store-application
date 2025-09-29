import React from 'react';
import './App.css';
import Application from './bookStore';
import { BrowserRouter as Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Wishlist from './components/wishlist';
import { WishlistProvider } from './context/wishlistContext';
import { CartProvider } from './context/cartContext';
import { AuthProvider } from './context/userAuthentication';
import BookDetails from './components/bookDetails';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Application />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/books/:id" element={<BookDetails />} />

      </Routes>
    </WishlistProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;

