import React from 'react';
import './App.css';
import Application from './bookStore';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Application />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router> 
  );
}

export default App;