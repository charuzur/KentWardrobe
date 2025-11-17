import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from './components/Signup.jsx';
import YourCart from './components/YourCart.jsx';
import TransactionHistory from './components/TransactionHistory.jsx';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<YourCart />} />
      <Route path="/transactions" element={<TransactionHistory />} />
    </Routes>
  );
}

export default App;
