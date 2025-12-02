import React, { useState } from 'react';
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Checkout.css'; 

import bgImage from "../assets/bg.jpg";

// IMPORT PRODUCT IMAGES
import vans from "../assets/products/vans.png";
import puma from "../assets/products/puma.png";

export default function Checkout() {
  const [transactions] = useState([
    { 
      id: 1, 
      item: 'New Balance 550', 
      quantity: 1, 
      details: 'size 7.5, black', 
      price: '₱1,000.00', 
      img: vans 
    }, 
    { 
      id: 2, 
      item: 'Puma Speedcat', 
      quantity: 1, 
      details: 'size 7.5, red', 
      price: '₱12,000.00', 
      img: puma 
    },
  ]);

  const parsePrice = (str) => Number(str.replace(/[^0-9.-]+/g, ""));
  
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 200;
  const total = subtotal + shippingFee;

  return (
    <div className="checkout-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      <div className="checkout-content">
        <div className="checkout-box">
          
          <div className="checkout-title">Checkout Summary</div>

          {/* NEW CONTAINER: Holds Left (Table) and Right (Summary) Side-by-Side */}
          <div className="checkout-body">
            
            {/* LEFT SIDE: TABLE */}
            <div className="checkout-left">
              <div className="checkout-table-section">
                <table className="checkout-table">
                  <thead>
                    <tr>
                      <th style={{width: '60px'}}>Product</th>
                      <th>Item Name</th>
                      <th>Qty</th>
                      <th>Details</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>
                          <img 
                            src={transaction.img} 
                            alt={transaction.item} 
                            className="checkout-img" 
                          />
                        </td>
                        <td style={{fontWeight: '600'}}>{transaction.item}</td>
                        <td>{transaction.quantity}</td>
                        <td style={{color:'#666', fontSize:'0.85rem'}}>{transaction.details}</td>
                        <td style={{fontWeight: 'bold'}}>{transaction.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDE: SUMMARY & BUTTONS */}
            <div className="checkout-right">
              <div className="order-summary-box">
                <div className="summary-header">Order Details</div>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping Fee</span>
                  <span>₱{shippingFee.toLocaleString()}</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>₱{total.toLocaleString()}</span>
                </div>

                {/* Buttons are now inside the summary card for compactness */}
                <div className="checkout-btn-group">
                  <button className="btn-confirm">
                    Confirm Order
                  </button>
                  <button className="btn-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>

      <footer className="checkout-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}