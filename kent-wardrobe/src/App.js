import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import YourCart from './components/YourCart.jsx';
import TransactionHistory from './components/TransactionHistory.jsx';
import Homepage from './components/Homepage.jsx';
import Profile from "./components/Profile.jsx";
import Checkout from "./components/Checkout.jsx";
import Favorites from "./components/Favorites.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<YourCart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transactions" element={<TransactionHistory />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;