import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import mascot from "./assets/mascot.png";
import bgImage from "./assets/bg.jpg";

export default function YourCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Vans Old Skool', size: 'Size 7.5', color: 'Black' },
    { id: 2, name: 'Puma Speedcat', size: 'Size 7.5', color: 'Red' },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="cart-navbar">
        <div className="cart-logo-section">
          <img src={logo} alt="Logo" className="cart-logo" />
        </div>
        <div className="cart-nav-links">
          <button className="cart-nav-btn">HOME</button>
          <button className="cart-nav-btn">TRANSACTION HISTORY</button>
          <button className="cart-nav-btn">PROFILE</button>
          <button className="cart-nav-btn active">CART</button>
          <button className="cart-nav-btn">LOGOUT</button>
        </div>
      </nav>

      <div className="cart-content">
        <div className="cart-box">
          <img src={mascot} alt="Mascot" className="cart-mascot" />
          <div className="cart-title">Your Cart</div>

          <div className="cart-lists-section">
            <div className="cart-lists-title">Cart Lists</div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <input type="checkbox" className="cart-item-checkbox" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-details">{item.size}, {item.color}</div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>

          <button className="cart-checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>

      <footer className="cart-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
