import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Pages.css';
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function TransactionHistory() {
  const [transactions] = useState([
    { id: 1, date: '01-02-2025', item: 'New Balance 550', quantity: 1, price: '₱10,200.00', status: 'Delivered' },
    { id: 2, date: '02-12-2025', item: 'Mushroom Croptop', quantity: 1, price: '₱1,300.00', status: 'Delivered' },
    { id: 3, date: '05-12-2025', item: 'Pink Star Pants', quantity: 1, price: '₱7,900.00', status: 'Shipping' },
  ]);

  const getStatusClass = (status) => {
    return status === 'Delivered' ? 'status-delivered' : 'status-shipping';
  };

  return (
    <div className="transaction-container-modern" style={{ backgroundImage: `url(${bgImage})` }}>
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

      <div className="transaction-content-modern">
        <div className="transaction-box-modern">
          <div className="transaction-title-modern">Transaction History</div>

          <div className="table-section-modern">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.item}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.price}</td>
                    <td className={getStatusClass(transaction.status)}>
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="footer-modern">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
