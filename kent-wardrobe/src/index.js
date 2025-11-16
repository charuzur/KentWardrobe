import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import YourCart from './components/YourCart.jsx';
import TransactionHistory from './components/TransactionHistory.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <TransactionHistory />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
