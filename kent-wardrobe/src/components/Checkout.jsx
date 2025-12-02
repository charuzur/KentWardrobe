import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Pages.css';
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function Checkout() {
  const [transactions] = useState([
    { id: 1, item: 'New Balance 550', quantity: 1, details: 'size 7.5, black', price: '₱10,000.00' }, 
    { id: 2, item: 'Puma Speedcat', quantity: 1, details: 'size 7.5, red', price: '₱12,000.00' },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Philippines',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    gcashNumber: '',
    gcashName: '',
    paypalEmail: '',
    paypalPassword: '',
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const addresses = {
    home: { label: 'Home', address: '123 Main Street, Cebu City, Philippines 6000', phone: '+63 912-345-6789' },
    office: { label: 'Office', address: '456 Business Ave, Cebu City, Philippines 6000', phone: '+63 912-345-6790' },
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSaveAddress = () => {
    if (newAddress.label && newAddress.fullName && newAddress.phone && newAddress.street && newAddress.city) {
      alert('Address saved successfully!');
      setShowAddressModal(false);
      setUseNewAddress(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const parsePrice = (str) => Number(str.replace(/[₱,]/g, ""));
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 200;
  const total = subtotal + shippingFee;

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
        <div className="transaction-box-modern checkout-enhanced">
          <div className="transaction-title-modern">Complete Your Order</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            {/* LEFT COLUMN - ORDER ITEMS & DELIVERY */}
            <div>
              {/* Order Items */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2e2e2e', marginBottom: '15px', borderBottom: '2px solid #FBFF89', paddingBottom: '10px' }}>Order Items</h3>
                <div className="table-section-modern">
                  <table className="table-modern">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
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
              </div>

              {/* Delivery Address */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2e2e2e', marginBottom: '15px', borderBottom: '2px solid #FBFF89', paddingBottom: '10px' }}>Delivery Address</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(addresses).map(([key, addr]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', cursor: 'pointer', border: selectedAddress === key ? '2px solid #FBFF89' : '2px solid transparent', transition: 'all 0.3s ease' }}>
                      <input type="radio" name="address" value={key} checked={selectedAddress === key} onChange={(e) => setSelectedAddress(e.target.value)} style={{ marginTop: '4px', cursor: 'pointer' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: '#2e2e2e' }}>{addr.label}</div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>{addr.address}</div>
                        <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '2px' }}>{addr.phone}</div>
                      </div>
                    </label>
                  ))}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={useNewAddress} onChange={(e) => { setUseNewAddress(e.target.checked); if (e.target.checked) setShowAddressModal(true); }} style={{ cursor: 'pointer' }} />
                    <span style={{ color: '#2e2e2e', fontWeight: '600' }}>Use a different address</span>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - PAYMENT & SUMMARY */}
            <div>
              {/* Payment Method */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2e2e2e', marginBottom: '15px', borderBottom: '2px solid #FBFF89', paddingBottom: '10px' }}>Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', cursor: 'pointer', border: paymentMethod === 'credit-card' ? '2px solid #FBFF89' : '2px solid transparent', transition: 'all 0.3s ease' }}>
                    <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
                    <span style={{ fontWeight: '600', color: '#2e2e2e' }}>💳 Credit/Debit Card</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', cursor: 'pointer', border: paymentMethod === 'gcash' ? '2px solid #FBFF89' : '2px solid transparent', transition: 'all 0.3s ease' }}>
                    <input type="radio" name="payment" value="gcash" checked={paymentMethod === 'gcash'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
                    <span style={{ fontWeight: '600', color: '#2e2e2e' }}>📱 GCash</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', cursor: 'pointer', border: paymentMethod === 'paypal' ? '2px solid #FBFF89' : '2px solid transparent', transition: 'all 0.3s ease' }}>
                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
                    <span style={{ fontWeight: '600', color: '#2e2e2e' }}>🅿️ PayPal</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', cursor: 'pointer', border: paymentMethod === 'cod' ? '2px solid #FBFF89' : '2px solid transparent', transition: 'all 0.3s ease' }}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
                    <span style={{ fontWeight: '600', color: '#2e2e2e' }}>🚚 Cash on Delivery</span>
                  </label>
                </div>

                {/* PAYMENT DETAILS FORMS */}
                {paymentMethod === 'credit-card' && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(251, 255, 137, 0.1)', borderRadius: '12px', border: '2px solid rgba(251, 255, 137, 0.3)' }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#2e2e2e', fontWeight: '700' }}>💳 Credit/Debit Card Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>Card Number *</label>
                        <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" maxLength="19" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>Card Holder Name *</label>
                        <input type="text" name="cardHolder" value={paymentDetails.cardHolder} onChange={handlePaymentChange} placeholder="John Doe" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>Expiry Date *</label>
                          <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentChange} placeholder="MM/YY" maxLength="5" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>CVV *</label>
                          <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentChange} placeholder="123" maxLength="3" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'gcash' && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(251, 255, 137, 0.1)', borderRadius: '12px', border: '2px solid rgba(251, 255, 137, 0.3)' }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#2e2e2e', fontWeight: '700' }}>📱 GCash Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>GCash Mobile Number *</label>
                        <input type="tel" name="gcashNumber" value={paymentDetails.gcashNumber} onChange={handlePaymentChange} placeholder="+63 9XX-XXX-XXXX" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>Account Name *</label>
                        <input type="text" name="gcashName" value={paymentDetails.gcashName} onChange={handlePaymentChange} placeholder="Your name" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: '#666' }}>
                        ℹ️ You will receive a payment link via GCash. Please complete the payment within 24 hours.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(251, 255, 137, 0.1)', borderRadius: '12px', border: '2px solid rgba(251, 255, 137, 0.3)' }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#2e2e2e', fontWeight: '700' }}>🅿️ PayPal Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>PayPal Email *</label>
                        <input type="email" name="paypalEmail" value={paymentDetails.paypalEmail} onChange={handlePaymentChange} placeholder="your.email@paypal.com" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#2e2e2e', fontSize: '0.9rem' }}>Password *</label>
                        <input type="password" name="paypalPassword" value={paymentDetails.paypalPassword} onChange={handlePaymentChange} placeholder="••••••••" style={{ width: '100%', padding: '10px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: '#666' }}>
                        ℹ️ You will be redirected to PayPal to complete the payment securely.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(84, 255, 187, 0.1)', borderRadius: '12px', border: '2px solid rgba(84, 255, 187, 0.3)' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#2e2e2e', fontWeight: '700' }}>🚚 Cash on Delivery</h4>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      ✓ Pay when your order arrives at your doorstep. No payment details needed now.
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="order-summary-modern" style={{ background: 'linear-gradient(135deg, rgba(251,255,137,0.15) 0%, rgba(251,255,137,0.05) 100%)', border: '2px solid rgba(251,255,137,0.3)' }}>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#2e2e2e', marginBottom: '15px', paddingBottom: '15px', borderBottom: '2px solid rgba(251,255,137,0.3)' }}>Order Summary</div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping Fee</span>
                  <span>₱{shippingFee.toLocaleString()}</span>
                </div>

                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span style={{ color: '#2e2e2e', fontSize: '1.3rem', fontWeight: '700' }}>₱{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="checkout-buttons" style={{ marginTop: '30px', justifyContent: 'center' }}>
            <button className="btn-confirm" style={{ minWidth: '200px' }}>
              ✓ Confirm & Pay
            </button>

            <button className="btn-cancel" style={{ minWidth: '200px' }}>
              ✕ Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(240, 240, 210, 0.98) 0%, rgba(250, 250, 230, 0.98) 100%)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700', color: '#2e2e2e' }}>Add New Address</h2>
              <button onClick={() => { setShowAddressModal(false); setUseNewAddress(false); }} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#2e2e2e' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Address Label *</label>
                <select name="label" value={newAddress.label} onChange={handleAddressInputChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none' }}>
                  <option value="">Select label</option>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Full Name *</label>
                <input type="text" name="fullName" value={newAddress.fullName} onChange={handleAddressInputChange} placeholder="Your full name" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Phone Number *</label>
                <input type="tel" name="phone" value={newAddress.phone} onChange={handleAddressInputChange} placeholder="+63 9XX-XXX-XXXX" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Postal Code</label>
                <input type="text" name="postalCode" value={newAddress.postalCode} onChange={handleAddressInputChange} placeholder="e.g., 6000" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Street Address *</label>
              <input type="text" name="street" value={newAddress.street} onChange={handleAddressInputChange} placeholder="e.g., 123 Main Street" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>City *</label>
                <input type="text" name="city" value={newAddress.city} onChange={handleAddressInputChange} placeholder="e.g., Cebu City" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Province</label>
                <input type="text" name="province" value={newAddress.province} onChange={handleAddressInputChange} placeholder="e.g., Cebu" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Country</label>
              <input type="text" name="country" value={newAddress.country} disabled style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', background: 'rgba(0,0,0,0.05)', color: '#999', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowAddressModal(false); setUseNewAddress(false); }} style={{ padding: '12px 28px', background: 'rgba(200, 200, 200, 0.6)', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.background = 'rgba(180, 180, 180, 0.8)'} onMouseLeave={(e) => e.target.style.background = 'rgba(200, 200, 200, 0.6)'}>
                Cancel
              </button>
              <button onClick={handleSaveAddress} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #FBFF89 0%, #f7f76a 100%)', color: '#2e2e2e', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(251, 255, 137, 0.3)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 16px rgba(251, 255, 137, 0.5)'} onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 12px rgba(251, 255, 137, 0.3)'}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer-modern">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
