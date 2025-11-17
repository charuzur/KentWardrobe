import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/App.css';
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function Checkout() {
  const [transactions] = useState([
    { id: 1, item: 'New Balance 550', quantity: 1, details: 'size 7.5, black', price: '$1,000.00' }, 
    { id: 2, item: 'Puma Speedcat', quantity: 1, details: 'size 7.5, red', price: '$12,000.00' },
  ]);

  const parsePrice = (str) => Number(str.replace(/[$,]/g, ""));
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 200;
  const total = subtotal + shippingFee;

  return (
    <div className="transaction-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="transaction-navbar">
        <div className="transaction-logo-section">
          <img src={mascot} alt="Logo" className="transaction-logo" />
        </div>
        <div className="transaction-nav-links">
          <NavLink to="/" className={({ isActive }) => "transaction-nav-btn" + (isActive ? " active" : "")}>HOME</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => "transaction-nav-btn" + (isActive ? " active" : "")}>TRANSACTION HISTORY</NavLink>
          <NavLink to="/profile" className={({ isActive }) => "transaction-nav-btn" + (isActive ? " active" : "")}>PROFILE</NavLink>
          <NavLink to="/cart" className={({ isActive }) => "transaction-nav-btn" + (isActive ? " active" : "")}>CART</NavLink>
          <NavLink to="/logout" className={({ isActive }) => "transaction-nav-btn" + (isActive ? " active" : "")}>LOGOUT</NavLink>
        </div>
      </nav>

      <div className="transaction-content">
        <div className="transaction-box">
          <div className="transaction-title">Checkout</div>

          <div className="transaction-table-section">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Details</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.item}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.details}</td>
                    <td>₱{parsePrice(transaction.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div
            style={{
              width: "90%",
              marginTop: "20px",
              padding: "20px",
              borderTop: "1px solid white",
              color: "black",
              fontSize: "18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span>Subtotal</span>
              <span>₱{subtotal.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <span>Shipping Fee</span>
              <span>₱{shippingFee.toLocaleString()}</span>
            </div>

            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontWeight: "bold", 
              fontSize: "22px",
              marginTop: "10px"
            }}>
              <span>Total</span>
              <span>₱{total.toLocaleString()}</span>
            </div>

            {/* Buttons */}
            <div style={{ 
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              gap: "20px"
            }}>
              <button 
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#54FFBB",
                  border: "none",
                  borderRadius: "8px",
                  color: "black",
                  fontSize: "16px",
                  cursor: "pointer",
                  opacity: "80%",
                  fontWeight: "bold"

                }}
              >
                Confirm
              </button>

              <button 
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#F0745C",
                  border: "none",
                  borderRadius: "8px",
                  color: "black",
                  fontSize: "16px",
                  cursor: "pointer",
                  opacity: "80%",
                  fontWeight: "bold"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="transaction-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
