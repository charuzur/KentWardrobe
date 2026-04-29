import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Checkout.css'; 
import '../css/Toast.css'; 

// NO IMAGE IMPORTS

export default function Checkout() {
  const navigate = useNavigate();
  
  // --- TOAST STATE ---
  const [notification, setNotification] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };
  
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [selectedAddress, setSelectedAddress] = useState('home');
  
  // MODAL STATES
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // NEW: Confirmation Modal

  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '', cardHolder: '', expiryDate: '', cvv: ''
  });

  const [gcashDetails, setGcashDetails] = useState({ phoneNumber: '' });

  const [customAddress, setCustomAddress] = useState({
    fullName: '', street: '', city: '', province: '', postalCode: '', phone: ''
  });

  // --- EFFECT: LOAD DATA ---
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    
    if (storedCart.length === 0) {
      navigate('/cart');
    } else {
      setTransactions(storedCart);
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
      setCustomAddress(prev => ({
         ...prev,
         fullName: storedUser.fullName || "",
         phone: storedUser.contactNumber || ""
      }));
    }
  }, [navigate]);

  const addresses = {
    home: { 
      label: '🏠 Home (From Profile)', 
      details: userData && userData.address ? userData.address : 'No address set in Profile', 
      phone: userData && userData.contactNumber ? userData.contactNumber : 'No contact set', 
      fullName: userData ? userData.fullName : 'Guest' 
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' || name === 'cvv') {
        if (isNaN(value)) return;
    }
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleGcashChange = (e) => {
      const val = e.target.value;
      if (isNaN(val)) return;
      setGcashDetails({ phoneNumber: val });
  };

  const handleCustomAddressChange = (e) => setCustomAddress({ ...customAddress, [e.target.name]: e.target.value });

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return Number(price.replace(/[^0-9.-]+/g, ""));
  };
  
  const subtotal = transactions.reduce((sum, t) => sum + parsePrice(t.price) * t.quantity, 0);
  const shippingFee = 500;
  const total = subtotal + shippingFee;

  // --- SAVE ADDRESS LOGIC ---
  const handleSaveAddress = () => {
    if (!customAddress.fullName || !customAddress.street || !customAddress.city || !customAddress.province || !customAddress.phone) {
        showToast("Please fill in all address fields.", "error"); return;
    }
    setIsAddressSaved(true);
    setSelectedAddress('custom');
    setShowAddressForm(false);
    showToast("Address Saved!", "success");
  };

  const getSelectedAddressInfo = () => {
    if (selectedAddress === 'custom') {
      return {
        label: '📍 Custom Address',
        details: `${customAddress.street}, ${customAddress.city}, ${customAddress.province}`,
        phone: customAddress.phone,
        fullName: customAddress.fullName
      };
    }
    return addresses[selectedAddress];
  };

  // --- STEP 1: VALIDATE AND SHOW MODAL ---
  const validateAndConfirm = () => {
    // Validation
    if (paymentMethod === 'credit-card') {
        if (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.cardHolder) {
           showToast('Please fill in all card details', "error"); return;
        }
        if (cardDetails.cardNumber.length < 16) {
           showToast('Invalid Card Number', "error"); return;
        }
    }
    if (paymentMethod === 'gcash') {
        if (!gcashDetails.phoneNumber || gcashDetails.phoneNumber.length < 11) {
           showToast('Please enter a valid GCash number', "error"); return;
        }
    }
    
    if (selectedAddress === 'home') {
       if (!userData || !userData.address) {
          showToast("Profile address is empty.", "error"); return;
       }
    }
    if (selectedAddress === 'custom' && !isAddressSaved) {
         showToast('Please save your custom address', "error"); return;
    }

    // IF VALID: OPEN MODAL
    setShowConfirmModal(true);
  };

  // --- STEP 2: ACTUALLY SEND TO BACKEND ---
  const submitOrder = () => {
    setIsSubmitting(true);
    const addrInfo = getSelectedAddressInfo();

    let safePaymentDetails = "";
    if (paymentMethod === 'credit-card') {
        const last4 = cardDetails.cardNumber.slice(-4);
        safePaymentDetails = `Card ending in **** ${last4}`;
    } else if (paymentMethod === 'gcash') {
        safePaymentDetails = `GCash: ${gcashDetails.phoneNumber}`;
    } else {
        safePaymentDetails = "Cash on Delivery";
    }

    const orderPayload = {
        trackingNumber: 'TRK-' + Date.now(), 
        customerName: addrInfo.fullName,
        email: userData ? userData.email : "guest@example.com", 
        address: addrInfo.details, 
        contactNumber: addrInfo.phone,
        paymentMethod: safePaymentDetails,
        totalAmount: total,
        shippingFee: shippingFee,
        items: transactions.map(t => ({
            productName: t.name, 
            quantity: t.quantity,
            price: parsePrice(t.price),
            productImg: t.img,
            size: t.size,
            color: t.color
        }))
    };

    fetch("http://localhost:8080/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to place order");
        return response.json();
    })
    .then(data => {
        // Smart Remove from Cart
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = currentCart.filter(cartItem => {
            const wasPurchased = transactions.some(t => 
                t.id === cartItem.id && t.size === cartItem.size && t.color === cartItem.color
            );
            return !wasPurchased; 
        });

        localStorage.setItem("cart", JSON.stringify(newCart));
        localStorage.removeItem("checkoutItems");

        setCompletedOrder({
            orderId: data.trackingNumber, 
            date: new Date().toLocaleDateString(),
            items: transactions, 
            subtotal, shippingFee, total,
            paymentMethod: safePaymentDetails,
            address: addrInfo
        });
        
        setShowConfirmModal(false); // Close Modal
        setOrderCompleted(true);
        setIsSubmitting(false);
        showToast("Order Placed Successfully!", "success");
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Something went wrong.", "error");
        setIsSubmitting(false);
        setShowConfirmModal(false);
    });
  };

  // --- ORDER SUCCESS VIEW ---
  if (orderCompleted && completedOrder) {
    return (
      <div className="checkout-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        {notification.message && <div className={`glass-toast toast-${notification.type}`}>{notification.type === 'success' ? '✓' : '✕'} {notification.message}</div>}
        <Navbar />
        <div className="checkout-content">
          <div className="checkout-box success-box">
            <div className="success-icon-wrapper"><span className="success-icon">✓</span></div>
            <h1 className="success-title">Order Placed Successfully!</h1>
            <div className="success-details">
                <p className="success-label">Tracking Number</p>
                <p className="success-tracking">{completedOrder.orderId}</p>
                <p className="success-message">Thank you for shopping with Kent's Wardrobe! <br/>Your order has been completed.</p>
            </div>
            <button className="btn-confirm btn-home" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
        <footer className="checkout-footer">© 2025 KentWardrobe, Inc. All rights reserved</footer>
      </div>
    );
  }

  // --- MAIN CHECKOUT VIEW ---
  return (
    <div className="checkout-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <Navbar />

      {/* ADDRESS MODAL */}
      {showAddressForm && (
        <div className="modal-overlay" onClick={() => setShowAddressForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Address</h2>
              <button className="modal-close" onClick={() => setShowAddressForm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><input type="text" name="fullName" placeholder="Recipient Name" value={customAddress.fullName} onChange={handleCustomAddressChange} className="form-input" /></div>
              <div className="form-group"><input type="text" name="street" placeholder="Street / Building" value={customAddress.street} onChange={handleCustomAddressChange} className="form-input" /></div>
              <div className="form-row">
                  <input type="text" name="city" placeholder="City" value={customAddress.city} onChange={handleCustomAddressChange} className="form-input" />
                  <input type="text" name="province" placeholder="Province" value={customAddress.province} onChange={handleCustomAddressChange} className="form-input" />
              </div>
              <div className="form-group"><input type="tel" name="phone" placeholder="Phone Number" value={customAddress.phone} onChange={handleCustomAddressChange} className="form-input" /></div>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-save" onClick={handleSaveAddress}>Save Address</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
             <div className="confirm-icon-wrapper" style={{background: '#2ecc71'}}>
                <span className="success-icon">?</span>
             </div>
             
             <h3>Confirm Order?</h3>
             <p>Total to Pay: <b>₱{total.toLocaleString()}</b></p>
             <p style={{fontSize:'0.9rem'}}>Please confirm your details are correct.</p>
             
             <div className="modal-actions-row">
               <button className="btn-modal-cancel" onClick={() => setShowConfirmModal(false)}>Cancel</button>
               <button className="btn-modal-confirm" onClick={submitOrder} disabled={isSubmitting}>
                 {isSubmitting ? "Processing..." : "Yes, Place Order"}
               </button>
             </div>
          </div>
        </div>
      )}

      <div className="checkout-content">
        <div className="checkout-box">
          <div className="checkout-title">Checkout Summary</div>

          <div className="checkout-layout">
            
            {/* LEFT COLUMN */}
            <div className="checkout-left">
              <div className="section-panel">
                <div className="panel-header">1. Delivery Address</div>
                <div className="address-grid">
                  <label className={`address-card ${selectedAddress === 'home' ? 'active' : ''}`}>
                    <input type="radio" name="addr" value="home" checked={selectedAddress === 'home'} onChange={(e) => setSelectedAddress(e.target.value)} />
                    <div className="addr-info">
                      <span className="addr-title">{addresses.home.label}</span>
                      <span className="addr-desc">{addresses.home.details}</span>
                    </div>
                  </label>
                  {isAddressSaved ? (
                     <label className={`address-card ${selectedAddress === 'custom' ? 'active' : ''}`}>
                        <input type="radio" name="addr" value="custom" checked={selectedAddress === 'custom'} onChange={(e) => setSelectedAddress(e.target.value)} />
                        <div className="addr-info">
                            <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                                <span className="addr-title">📍 Custom Address</span>
                                <span className="edit-link" onClick={() => setShowAddressForm(true)}>Edit</span>
                            </div>
                            <span className="addr-desc">{customAddress.street}, {customAddress.city}</span>
                        </div>
                     </label>
                  ) : (
                     <div className="add-address-btn" onClick={() => setShowAddressForm(true)}><span>+ Add New</span></div>
                  )}
                </div>
              </div>

              <div className="section-panel">
                <div className="panel-header">2. Payment Method</div>
                <div className="payment-options">
                  {['credit-card', 'gcash', 'cod'].map(method => (
                    <label key={method} className={`payment-card ${paymentMethod === method ? 'active' : ''}`}>
                      <input type="radio" name="pay" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <span>{method === 'credit-card' ? '💳 Card' : method === 'gcash' ? '📱 GCash' : '🚚 COD'}</span>
                    </label>
                  ))}
                </div>
                {paymentMethod === 'credit-card' && (
                  <div className="payment-inputs">
                    <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" maxLength="16" value={cardDetails.cardNumber} onChange={handleCardChange} className="form-input" />
                    <div className="form-row">
                      <input type="text" name="cardHolder" placeholder="Card Holder Name" value={cardDetails.cardHolder} onChange={handleCardChange} className="form-input" />
                      <input type="text" name="expiryDate" placeholder="MM/YY" maxLength="5" value={cardDetails.expiryDate} onChange={handleCardChange} className="form-input" />
                      <input type="text" name="cvv" placeholder="CVV" maxLength="3" value={cardDetails.cvv} onChange={handleCardChange} className="form-input" />
                    </div>
                  </div>
                )}
                {paymentMethod === 'gcash' && (
                  <div className="payment-inputs">
                    <input type="tel" name="phoneNumber" placeholder="0912 345 6789" maxLength="11" value={gcashDetails.phoneNumber} onChange={handleGcashChange} className="form-input" />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="checkout-right">
              <div className="summary-card">
                <div className="summary-header">Order Summary</div>
                <div className="summary-items">
                  {transactions.map((item, idx) => (
                    <div key={idx} className="summary-item">
                      <img src={item.img} alt={item.name} className="summary-img" onError={(e) => e.target.src = "/assets/mascot.png"}/>
                      <div className="summary-info">
                        <div className="summary-name">{item.name}</div>
                        <div className="summary-meta">Qty: {item.quantity} | {item.size}</div>
                        <div className="summary-price">₱{parsePrice(item.price).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row"><span>Subtotal</span><span>₱{subtotal.toLocaleString()}</span></div>
                <div className="summary-row"><span>Shipping</span><span>₱{shippingFee.toLocaleString()}</span></div>
                <div className="summary-total"><span>Total</span><span>₱{total.toLocaleString()}</span></div>

                <button className="btn-confirm" onClick={validateAndConfirm} disabled={isSubmitting}>
                   Confirm & Pay
                </button>
                <button className="btn-cancel" onClick={() => navigate('/cart')}>Cancel Order</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <footer className="checkout-footer">© 2025 KentWardrobe, Inc. All rights reserved</footer>
    </div>
  );
}