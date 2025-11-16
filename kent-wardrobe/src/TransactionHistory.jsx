import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import mascot from './assets/mascot.png';
import bgImage from "./assets/bg.jpg";

export default function TransactionHistory() {
  const [transactions] = useState([
    { id: 1, date: '01-02-2025', item: 'New Balance 550', quantity: 1, price: '$10,200.00', status: 'Delivered' },
    { id: 2, date: '02-12-2025', item: 'Mushroom Croptop', quantity: 1, price: '$1,300.00', status: 'Delivered' },
    { id: 3, date: '05-12-2025', item: 'Pink Star Pants', quantity: 1, price: '$7,900.00', status: 'Shipping' },
  ]);

  const getStatusClass = (status) => {
    return status === 'Delivered' ? 'transaction-status-delivered' : 'transaction-status-shipping';
  };

  return (
    <div className="transaction-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="transaction-navbar">
        <div className="transaction-logo-section">
          <img src={logo} alt="Logo" className="transaction-logo" />
        </div>
        <div className="transaction-nav-links">
          <button className="transaction-nav-btn">HOME</button>
          <button className="transaction-nav-btn active">TRANSACTION HISTORY</button>
          <button className="transaction-nav-btn">PROFILE</button>
          <button className="transaction-nav-btn">CART</button>
          <button className="transaction-nav-btn">LOGOUT</button>
        </div>
      </nav>

      <div className="transaction-content">
        <div className="transaction-box">
          <img src={mascot} alt="Mascot" className="transaction-mascot" />
          <div className="transaction-title">Transaction History</div>

          <div className="transaction-table-section">
            <table className="transaction-table">
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

      <footer className="transaction-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
