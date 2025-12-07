import React, { useState } from 'react';
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Checkout.css'; 
import bgImage from "../assets/bg.jpg";
import vans from "../assets/products/vans.png";
import puma from "../assets/products/puma.png";

export default function Checkout() {
  const [transactions] = useState([
    { 
      id: 1, 
      item: 'New Balance 550', 
      quantity: 1, 
      details: 'size 7.5, black', 
      price: '₱10,000.00', 
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

  const [deliveryAddress, setDeliveryAddress] = useState({
    type: 'home',
    fullName: '',
    street: '123 Main Street, Cebu City, Philippines 6000',
    phone: '+63 9 12 345 6789',
    altAddress: false,
    altStreet: '456 Business Ave, Cebu City, Philippines 6000',
    altPhone: '+63 9 12 345 6789'
  });

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [gcashNumber, setGcashNumber] = useState('');
  const [gcashConfirmed, setGcashConfirmed] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const parsePrice = (str) => Number(str.replace(/[^0-9.-]+/g, ""));
  
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  return (
    <div className="checkout-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      <div className="checkout-content">
        <div className="checkout-box">
          
          <div className="checkout-title">Complete Your Order</div>

          {/* MAIN GRID LAYOUT */}
          <div className="checkout-grid">
            
            {/* LEFT COLUMN */}
            <div className="checkout-left-column">
              
              {/* ORDER ITEMS SECTION */}
              <div className="order-items-section">
                <div className="section-label">Order Items</div>
                <table className="items-table">
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
                        <td>{transaction.item}</td>
                        <td>{transaction.quantity}</td>
                        <td>{transaction.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* DELIVERY ADDRESS SECTION */}
              <div className="delivery-address-section">
                <div className="section-label">Delivery Address</div>
                
                <div className="address-option">
                  <input 
                    type="radio" 
                    name="addressType" 
                    value="home"
                    checked={deliveryAddress.type === 'home'}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, type: 'home'})}
                    id="home-address"
                  />
                  <label htmlFor="home-address" className="address-label">
                    <div className="address-title">Home</div>
                    <div className="address-details">{deliveryAddress.street}</div>
                    <div className="address-phone">{deliveryAddress.phone}</div>
                  </label>
                </div>

                <div className="address-option">
                  <input 
                    type="radio" 
                    name="addressType" 
                    value="office"
                    checked={deliveryAddress.type === 'office'}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, type: 'office'})}
                    id="office-address"
                  />
                  <label htmlFor="office-address" className="address-label">
                    <div className="address-title">Office</div>
                    <div className="address-details">{deliveryAddress.altStreet}</div>
                    <div className="address-phone">{deliveryAddress.altPhone}</div>
                  </label>
                </div>

                <div className="use-different-address">
                  <input 
                    type="checkbox" 
                    id="different-address"
                    checked={deliveryAddress.altAddress}
                    onChange={(e) => {
                      setDeliveryAddress({...deliveryAddress, altAddress: e.target.checked});
                      if (e.target.checked) {
                        setShowAddressModal(true);
                      }
                    }}
                  />
                  <label htmlFor="different-address">Use a different address</label>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="checkout-right-column">
              
              {/* PAYMENT METHOD SECTION */}
              <div className="payment-method-section">
                <div className="section-label">Payment Method</div>
                
                <div className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    id="credit-card"
                  />
                  <label htmlFor="credit-card" className="payment-label">
                    <span className="payment-icon">💳</span>
                    <span>Credit/Debit Card</span>
                  </label>
                </div>

                <div className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="gcash"
                    checked={paymentMethod === 'gcash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    id="gcash"
                  />
                  <label htmlFor="gcash" className="payment-label">
                    <span className="payment-icon">📱</span>
                    <span>GCash</span>
                  </label>
                </div>

                <div className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    id="cod"
                  />
                  <label htmlFor="cod" className="payment-label">
                    <span className="payment-icon">🚚</span>
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* GCASH NUMBER SECTION - Only show if GCash selected */}
              {paymentMethod === 'gcash' && (
                <div className="gcash-section">
                  <div className="section-label">GCash Number</div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+63 9 12 345 6789"
                      value={gcashNumber}
                      onChange={(e) => setGcashNumber(e.target.value)}
                      className="form-input"
                      disabled={gcashConfirmed}
                    />
                  </div>
                  <button 
                    className={`btn-confirm-gcash ${gcashConfirmed ? 'confirmed' : ''}`}
                    onClick={() => {
                      if (!gcashConfirmed && gcashNumber.trim()) {
                        setGcashConfirmed(true);
                      } else if (gcashConfirmed) {
                        setGcashConfirmed(false);
                      }
                    }}
                  >
                    {gcashConfirmed ? '✓ Confirmed' : 'Confirm Number'}
                  </button>
                </div>
              )}

              {/* CARD DETAILS SECTION - Only show if credit card selected */}
              {paymentMethod === 'credit-card' && (
                <div className="card-details-section">
                  <div className="section-label">Credit/Debit Card Details</div>
                  
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      className="form-input"
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
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ORDER SUMMARY SECTION - FULL WIDTH */}
          <div className="order-summary-section">
            <div className="section-label">Order Summary</div>
            
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
              <button 
                className="btn-confirm"
                onClick={() => setShowOrderDetails(true)}
              >
                ✓ Confirm & Pay
              </button>
              <button className="btn-cancel">
                ✕ Cancel Order
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="address-modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enter New Address</h2>
              <button className="modal-close" onClick={() => setShowAddressModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="John Doe"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Street Address *</label>
                <input 
                  type="text" 
                  name="street"
                  placeholder="123 Main Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Cebu City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Province *</label>
                  <input 
                    type="text" 
                    name="province"
                    placeholder="Cebu"
                    value={newAddress.province}
                    onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Postal Code *</label>
                <input 
                  type="text" 
                  name="postalCode"
                  placeholder="6000"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+63 9 12 345 6789"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-save-address"
                onClick={() => {
                  setDeliveryAddress({
                    ...deliveryAddress,
                    street: `${newAddress.street}, ${newAddress.city}, ${newAddress.province} ${newAddress.postalCode}`,
                    phone: newAddress.phone
                  });
                  setShowAddressModal(false);
                  setNewAddress({fullName: '', street: '', city: '', province: '', postalCode: '', phone: ''});
                }}
              >
                Save Address
              </button>
              <button 
                className="btn-cancel-modal"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {showOrderDetails && (
        <div className="order-details-overlay" onClick={() => setShowOrderDetails(false)}>
          <div className="order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={() => setShowOrderDetails(false)}>✕</button>
            </div>

            <div className="modal-body">
              {/* Order Items */}
              <div className="details-section">
                <h3>Order Items</h3>
                <div className="details-table">
                  {transactions.map((item) => (
                    <div key={item.id} className="details-row">
                      <div className="details-item-name">{item.item}</div>
                      <div className="details-item-qty">Qty: {item.quantity}</div>
                      <div className="details-item-price">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="details-section">
                <h3>Delivery Address</h3>
                <p className="details-text">{deliveryAddress.street}</p>
                <p className="details-text">{deliveryAddress.phone}</p>
              </div>

              {/* Payment Method */}
              <div className="details-section">
                <h3>Payment Method</h3>
                <p className="details-text">
                  {paymentMethod === 'credit-card' && 'Credit/Debit Card'}
                  {paymentMethod === 'gcash' && `GCash - ${gcashNumber}`}
                  {paymentMethod === 'cod' && 'Cash on Delivery'}
                </p>
              </div>

              {/* Order Summary */}
              <div className="details-section">
                <h3>Order Summary</h3>
                <div className="details-summary">
                  <div className="summary-item">
                    <span>Subtotal:</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Shipping Fee:</span>
                    <span>₱{shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="summary-total-item">
                    <span>Total Amount:</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-confirm-order"
                onClick={() => {
                  alert('Order placed successfully!');
                  setShowOrderDetails(false);
                }}
              >
                Place Order
              </button>
              <button 
                className="btn-cancel-modal"
                onClick={() => setShowOrderDetails(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="checkout-footer">
        &copy; 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}