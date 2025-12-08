import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Checkout.css'; 
import bgImage from "../assets/bg.jpg";
import vans from "../assets/products/vans.png";
import puma from "../assets/products/puma.png";

export default function Checkout() {
  const navigate = useNavigate();
  
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

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [gcashDetails, setGcashDetails] = useState({
    phoneNumber: ''
  });

  const [customAddress, setCustomAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    phone: ''
  });

  const addresses = {
    home: {
      label: '🏠 Home',
      details: '123 Main Street, Cebu City, Philippines 6000',
      phone: '+63 912 345 6789'
    },
    office: {
      label: '🏢 Office',
      details: '456 Business Ave, Cebu City, Philippines 6000',
      phone: '+63 912 345 6789'
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGcashChange = (e) => {
    const { name, value } = e.target;
    setGcashDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomAddressChange = (e) => {
    const { name, value } = e.target;
    setCustomAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const parsePrice = (str) => Number(str.replace(/[^0-9.-]+/g, ""));
  
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  const getSelectedAddressInfo = () => {
    if (selectedAddress === 'custom') {
      return {
        label: '📍 Custom Address',
        details: `${customAddress.street}, ${customAddress.city}, ${customAddress.province} ${customAddress.postalCode}`,
        phone: customAddress.phone,
        fullName: customAddress.fullName
      };
    }
    return addresses[selectedAddress];
  };

  const handleConfirmOrder = () => {
    // Validate form based on payment method
    if (paymentMethod === 'credit-card') {
      if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    } else if (paymentMethod === 'gcash') {
      if (!gcashDetails.phoneNumber) {
        alert('Please enter your GCash phone number');
        return;
      }
    }

    if (selectedAddress === 'custom') {
      if (!customAddress.fullName || !customAddress.street || !customAddress.city || !customAddress.province || !customAddress.postalCode || !customAddress.phone) {
        alert('Please fill in all address details');
        return;
      }
    }

    // Create order object
    const order = {
      orderId: 'ORD-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      items: transactions,
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: total,
      paymentMethod: paymentMethod,
      address: getSelectedAddressInfo(),
      cardDetails: paymentMethod === 'credit-card' ? cardDetails : null,
      gcashPhone: paymentMethod === 'gcash' ? gcashDetails.phoneNumber : null
    };

    setCompletedOrder(order);
    setOrderCompleted(true);
  };

  const handleCancelOrder = () => {
    navigate('/cart');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show order completion page
  if (orderCompleted && completedOrder) {
    return (
      <div className="checkout-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        <Navbar />
        <div className="checkout-content">
          <div className="order-completion-box">
            <div className="completion-header">
              <div className="success-icon">✓</div>
              <h1>Order Completed!</h1>
              <p>Thank you for your purchase</p>
            </div>

            <div className="completion-details">
              <div className="detail-section">
                <h3>Order ID</h3>
                <p className="order-id">{completedOrder.orderId}</p>
              </div>

              <div className="detail-section">
                <h3>Order Date & Time</h3>
                <p>{completedOrder.date} at {completedOrder.time}</p>
              </div>

              <div className="detail-section">
                <h3>Items Ordered</h3>
                <table className="completion-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.item}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="detail-section">
                <h3>Delivery Address</h3>
                <p><strong>{completedOrder.address.fullName || 'Recipient'}</strong></p>
                <p>{completedOrder.address.details}</p>
                <p>{completedOrder.address.phone}</p>
              </div>

              <div className="detail-section">
                <h3>Payment Method</h3>
                <p>
                  {completedOrder.paymentMethod === 'credit-card' && '💳 Credit/Debit Card'}
                  {completedOrder.paymentMethod === 'gcash' && '📱 GCash'}
                  {completedOrder.paymentMethod === 'cod' && '🚚 Cash on Delivery'}
                </p>
              </div>

              <div className="detail-section price-summary">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₱{completedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Shipping Fee:</span>
                  <span>₱{completedOrder.shippingFee.toLocaleString()}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount:</span>
                  <span>₱{completedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button className="btn-back-home" onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
        <footer className="checkout-footer">
          &copy; 2025 KentWardrobe, Inc. All rights reserved
        </footer>
      </div>
    );
  }

  return (
    <div className="checkout-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      {/* ADDRESS FORM MODAL */}
      {showAddressForm && (
        <div className="modal-overlay" onClick={() => setShowAddressForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enter Your Address</h2>
              <button className="modal-close" onClick={() => setShowAddressForm(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Your Full Name"
                  value={customAddress.fullName}
                  onChange={handleCustomAddressChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input 
                  type="text" 
                  name="street"
                  placeholder="Street Address"
                  value={customAddress.street}
                  onChange={handleCustomAddressChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="City"
                    value={customAddress.city}
                    onChange={handleCustomAddressChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Province *</label>
                  <input 
                    type="text" 
                    name="province"
                    placeholder="Province"
                    value={customAddress.province}
                    onChange={handleCustomAddressChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="Postal Code"
                    value={customAddress.postalCode}
                    onChange={handleCustomAddressChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number"
                    value={customAddress.phone}
                    onChange={handleCustomAddressChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setShowAddressForm(false)}>
                Cancel
              </button>
              <button className="btn-modal-save" onClick={() => {
                if (customAddress.fullName && customAddress.street && customAddress.city && customAddress.province && customAddress.postalCode && customAddress.phone) {
                  setSelectedAddress('custom');
                  setShowAddressForm(false);
                } else {
                  alert('Please fill in all address fields');
                }
              }}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-content">
        <div className="checkout-box">
          
          <div className="checkout-title">Complete Your Order</div>

          <div className="checkout-body">
            
            {/* LEFT SIDE: ORDER ITEMS */}
            <div className="checkout-left">
              <div className="section-header">Order Items</div>
              <div className="order-items-section">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td style={{fontWeight: '600'}}>{transaction.item}</td>
                        <td>{transaction.quantity}</td>
                        <td style={{fontWeight: 'bold'}}>{transaction.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDE: PAYMENT & DELIVERY */}
            <div className="checkout-right">
              
              {/* PAYMENT METHOD SECTION */}
              <div className="payment-section">
                <div className="section-header">Payment Method</div>
                <div className="payment-options">
                  <label className="payment-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💳 Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="gcash"
                      checked={paymentMethod === 'gcash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>📱 GCash</span>
                  </label>
                  <label className="payment-option">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🚚 Cash on Delivery</span>
                  </label>
                </div>

                {/* CREDIT CARD DETAILS - Show only when credit card is selected */}
                {paymentMethod === 'credit-card' && (
                  <div className="card-details-section">
                    <div className="card-details-header">💳 Credit/Debit Card Details</div>
                    
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        className="form-input"
                        maxLength="19"
                      />
                    </div>

                    <div className="form-group">
                      <label>Card Holder Name *</label>
                      <input 
                        type="text" 
                        name="cardHolder"
                        placeholder="John Doe"
                        value={cardDetails.cardHolder}
                        onChange={handleCardChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input 
                          type="text" 
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardChange}
                          className="form-input"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input 
                          type="text" 
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          className="form-input"
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* GCASH DETAILS - Show only when GCash is selected */}
                {paymentMethod === 'gcash' && (
                  <div className="card-details-section">
                    <div className="card-details-header">📱 GCash Phone Number</div>
                    
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phoneNumber"
                        placeholder="+63 9XX XXX XXXX"
                        value={gcashDetails.phoneNumber}
                        onChange={handleGcashChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* DELIVERY ADDRESS SECTION */}
          <div className="delivery-section">
            <div className="section-header">Delivery Address</div>
            <div className="address-options">
              <label className="address-option">
                <input 
                  type="radio" 
                  name="address" 
                  value="home"
                  checked={selectedAddress === 'home'}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
                <div className="address-content">
                  <div className="address-label">🏠 Home</div>
                  <div className="address-details">123 Main Street, Cebu City, Philippines 6000</div>
                  <div className="address-phone">+63 912 345 6789</div>
                </div>
              </label>
              <label className="address-option">
                <input 
                  type="radio" 
                  name="address" 
                  value="office"
                  checked={selectedAddress === 'office'}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
                <div className="address-content">
                  <div className="address-label">🏢 Office</div>
                  <div className="address-details">456 Business Ave, Cebu City, Philippines 6000</div>
                  <div className="address-phone">+63 912 345 6789</div>
                </div>
              </label>
              <label className="address-option">
                <input 
                  type="checkbox"
                  checked={selectedAddress === 'custom'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShowAddressForm(true);
                    } else {
                      setSelectedAddress('home');
                    }
                  }}
                />
                <span>Use a different address</span>
              </label>
              {selectedAddress === 'custom' && (
                <div className="custom-address-display">
                  <p><strong>{customAddress.fullName}</strong></p>
                  <p>{customAddress.street}, {customAddress.city}, {customAddress.province} {customAddress.postalCode}</p>
                  <p>{customAddress.phone}</p>
                  <button className="btn-edit-address" onClick={() => setShowAddressForm(true)}>
                    Edit Address
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ORDER SUMMARY SECTION */}
          <div className="order-summary-section">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₱{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Fee</span>
              <span>₱{shippingFee.toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₱{total.toLocaleString()}</span>
            </div>

            <div className="checkout-btn-group">
              <button className="btn-confirm" onClick={handleConfirmOrder}>
                ✓ Confirm & Pay
              </button>
              <button className="btn-cancel" onClick={handleCancelOrder}>
                ✕ Cancel Order
              </button>
            </div>
          </div>
          
        </div>
      </div>

      <footer className="checkout-footer">
        &copy; 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}