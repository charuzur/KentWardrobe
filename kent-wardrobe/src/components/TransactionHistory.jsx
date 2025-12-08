import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Transaction.css'; 
import '../css/Toast.css'; 

// NO IMAGE IMPORTS

export default function TransactionHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [buyAgainOrder, setBuyAgainOrder] = useState(null); 
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = storedUser ? storedUser.email : "guest@example.com";

    fetch(`http://localhost:8080/api/orders/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => {
           const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
           const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
           return dateB - dateA; 
        });
        setOrders(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const toggleDetails = (id) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null); 
    } else {
      setExpandedOrderId(id); 
    }
  };

  const initiateBuyAgain = (order) => {
    setBuyAgainOrder(order); 
  };

  const confirmBuyAgain = () => {
    if (!buyAgainOrder) return;

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemsToAdd = buyAgainOrder.items.map(item => ({
        id: Date.now() + Math.random(), 
        name: item.productName,
        price: item.price,
        img: item.productImg,
        quantity: item.quantity,
        size: item.size || "M", 
        color: item.color || "Standard" 
    }));

    const newCart = [...currentCart, ...itemsToAdd];
    localStorage.setItem("cart", JSON.stringify(newCart));

    showToast("Items added to Cart!", "success");
    setBuyAgainOrder(null); 
  };

  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s === 'delivered') return 'transaction-status-delivered';
    if (s === 'shipping' || s === 'in transit') return 'transaction-status-shipping';
    return 'transaction-status-processing';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="transaction-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <Navbar />

      <div className="transaction-content">
        <div className="transaction-box">
          
          <div className="transaction-title">Order History</div>

          {loading ? (
            <div style={{textAlign: 'center', padding: '20px', color: '#555'}}>Loading history...</div>
          ) : orders.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px', color: '#555'}}>
              <h3>No orders found.</h3>
              <p>Items you purchase will appear here.</p>
            </div>
          ) : (
            <div className="transaction-table-section">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      {/* MAIN ROW */}
                      <tr className={expandedOrderId === order.id ? "active-row" : ""}>
                        <td style={{fontWeight: '700', color: '#2e2e2e'}}>
                           {order.trackingNumber || `#${order.id}`}
                        </td>
                        <td style={{color: '#666'}}>{formatDate(order.createdAt)}</td>
                        <td style={{fontWeight: 'bold'}}>₱{(order.totalAmount || 0).toLocaleString()}</td>
                        <td>
                          <span className={getStatusClass(order.status)}>
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-view-details" 
                            onClick={() => toggleDetails(order.id)}
                          >
                            {expandedOrderId === order.id ? "Hide Details" : "View Details"}
                          </button>
                        </td>
                      </tr>

                      {/* EXPANDED DETAILS ROW */}
                      {expandedOrderId === order.id && (
                        <tr className="details-row">
                          <td colSpan="5">
                            <div className="order-details-panel">
                              
                              <h4 className="details-header">Items</h4>
                              <div className="details-items-grid">
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className="details-item-card">
                                    <img 
                                      src={item.productImg || "/assets/mascot.png"} 
                                      alt={item.productName} 
                                      className="details-img" 
                                      onError={(e) => e.target.src = "/assets/mascot.png"} 
                                    />
                                    <div className="details-info">
                                      <div className="details-name">{item.productName}</div>
                                      <div className="details-meta">Qty: {item.quantity} | Size: {item.size || "N/A"}</div>
                                    </div>
                                    <div className="details-price">₱{(item.price || 0).toLocaleString()}</div>
                                  </div>
                                ))}
                              </div>

                              <div className="details-divider"></div>

                              <div className="details-info-grid">
                                <div className="info-block">
                                  <span className="info-label">Delivery Address</span>
                                  <div className="info-value">{order.address}</div>
                                  <div className="info-value">{order.contactNumber}</div>
                                </div>
                                <div className="info-block">
                                  <span className="info-label">Payment Method</span>
                                  <div className="info-value">{order.paymentMethod}</div>
                                </div>
                                <div className="info-block summary-block">
                                  <div className="summary-line">
                                    <span>Shipping:</span>
                                    <span>₱{(order.shippingFee || 0).toLocaleString()}</span>
                                  </div>
                                  <div className="summary-line total">
                                    <span>Total:</span>
                                    <span>₱{(order.totalAmount || 0).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="details-actions">
                                <button className="btn-reorder" onClick={() => initiateBuyAgain(order)}>
                                  🔄 Buy Again
                                </button>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* --- PREMIUM CONFIRMATION MODAL --- */}
      {buyAgainOrder && (
        <div className="modal-overlay" onClick={() => setBuyAgainOrder(null)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper">
                {/* Shopping Bag Icon or Question Mark */}
                <span>🛍️</span>
            </div>
            
            <h3>Buy Again?</h3>
            <p>This will add all items from Order <b>{buyAgainOrder.trackingNumber || buyAgainOrder.id}</b> to your cart.</p>
            
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setBuyAgainOrder(null)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={confirmBuyAgain}>Yes, Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      <footer className="transaction-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}