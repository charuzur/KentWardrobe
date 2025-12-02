import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Pages.css';
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function YourCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Vans Old Skool', size: 'Size 7.5', color: 'Black', price: '₱1,000.00' },
    { id: 2, name: 'Puma Speedcat', size: 'Size 7.5', color: 'Red', price: '₱12,000.00' },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="cart-navbar-modern">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={mascot} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <h1 style={{ margin: 0, color: '#FBFF89', fontSize: '1.5rem', fontWeight: '700' }}>KentWardrobe</h1>
        </div>
        <div className="cart-nav-modern">
          <NavLink to="/" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>HOME</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>HISTORY</NavLink>
          <NavLink to="/profile" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>PROFILE</NavLink>
          <NavLink to="/cart" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>CART</NavLink>
          <NavLink to="/login" style={{ backgroundColor: 'rgba(220, 100, 100, 0.8)', color: 'white' }} className="cart-nav-btn-modern">LOGOUT</NavLink>
        </div>
      </nav>

      <div className="cart-content-modern">
        <div className="cart-box-modern">
          <div className="cart-title-modern">Your Cart</div>

          <div className="cart-items-section">
            <div className="cart-items-title">Items in Cart ({cartItems.length})</div>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-modern">
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  <div className="cart-item-info-modern">
                    <div className="cart-item-name-modern">{item.name}</div>
                    <div className="cart-item-details-modern">{item.size} • {item.color}</div>
                  </div>
                  <div style={{ fontWeight: '700', color: '#FBFF89', marginRight: '20px' }}>{item.price}</div>
                  <button
                    className="cart-item-remove-modern"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p style={{ fontSize: '1.1rem' }}>Your cart is empty</p>
              </div>
            )}
          </div>

          <button className="cart-checkout-btn-modern" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <footer className="footer-modern">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
