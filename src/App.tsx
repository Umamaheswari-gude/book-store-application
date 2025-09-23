import React from 'react';
import './App.css';
import Application from './bookStore';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import Wishlist from './components/wishlist';
import { WishlistProvider } from './context/wishlistContext';
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <CartProvider>
    <WishlistProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Application />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router> 
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;

