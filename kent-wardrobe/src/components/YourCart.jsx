import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Cart.css'; 

import bgImage from "../assets/bg.jpg";

// Import sample images
import vans from "../assets/products/vans.png";
import puma from "../assets/products/puma.png";

export default function YourCart() {
  const navigate = useNavigate(); 

  // Added 'quantity' property to items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Vans Old Skool', size: 'Size 7.5', color: 'Black', img: vans, price: '₱1,000.00', quantity: 1 },
    { id: 2, name: 'Puma Speedcat', size: 'Size 7.5', color: 'Red', img: puma, price: '₱12,000.00', quantity: 1 },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // NEW: Function to handle Quantity Changes
  const handleQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        // Prevent quantity from going below 1
        const newQuantity = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      <div className="cart-content">
        <div className="cart-box">
          
          <div className="cart-title">Your Shopping Cart</div>

          <div className="cart-lists-section">
            {cartItems.length === 0 ? (
              <p style={{textAlign: 'center', fontSize: '1.2rem', marginTop: '30px'}}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  
                  {/* Left: Checkbox & Image */}
                  <div style={{display:'flex', alignItems:'center'}}>
                    <input type="checkbox" className="cart-item-checkbox" />
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                  </div>

                  {/* Middle: Details */}
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-details">{item.size} | {item.color}</div>
                    <div style={{fontWeight: 'bold', marginTop: '2px', color: '#444'}}>{item.price}</div>
                  </div>

                  {/* NEW: QUANTITY SELECTOR */}
                  <div className="quantity-box">
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    
                    <span className="qty-value">{item.quantity}</span>
                    
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Right: Remove Button */}
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-checkout-section">
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              CHECKOUT NOW
            </button>
          </div>

        </div>
      </div>

      <footer className="cart-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}