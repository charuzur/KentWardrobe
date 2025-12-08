import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import '../css/App.css';
import '../css/Cart.css'; 
import '../css/Toast.css'; 
import '../css/Homepage.css'; 

// NO IMAGE IMPORTS

export default function YourCart() {
  const navigate = useNavigate(); 
  const [cartItems, setCartItems] = useState([]);
  
  // --- SELECTION STATE ---
  const [selectedIndices, setSelectedIndices] = useState([]);

  // --- CONFIRMATION STATE ---
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  // --- TOAST STATE ---
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // --- EDIT MODAL STATE ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editItem, setEditItem] = useState(null); 
  const [editQty, setEditQty] = useState(1);
  const [editSize, setEditSize] = useState("");
  const [editColor, setEditColor] = useState("");

  // --- LOAD CART ---
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCartStorage = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  // --- CHECKBOX LOGIC ---
  const toggleSelect = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const isAllSelected = cartItems.length > 0 && selectedIndices.length === cartItems.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIndices([]);
    } else {
      const allIndices = cartItems.map((_, index) => index);
      setSelectedIndices(allIndices);
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setSelectedIndices(selectedIndices.filter(i => i !== index).map(i => i > index ? i - 1 : i));
    updateCartStorage(newItems);
    showToast("Item removed", "success");
  };

  const handleQuantity = (index, amount) => {
    const newItems = [...cartItems];
    const item = newItems[index];
    const newQty = Math.max(1, item.quantity + amount);
    item.quantity = newQty;
    updateCartStorage(newItems);
  };

  // --- 1. CLICK CHECKOUT (Opens Modal) ---
  const initiateCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }

    if (selectedIndices.length === 0) {
      showToast("Please select at least one item to checkout.", "error");
      return;
    }

    // Open Confirmation Modal
    setShowCheckoutConfirm(true);
  };

  // --- 2. CONFIRM CHECKOUT (Navigates) ---
  const proceedToCheckout = () => {
    // Filter only selected items
    const itemsToCheckout = cartItems.filter((_, index) => selectedIndices.includes(index));

    // Save to session storage
    localStorage.setItem("checkoutItems", JSON.stringify(itemsToCheckout));

    navigate('/checkout');
  };

  // --- EDIT MODAL FUNCTIONS ---
  const openEditModal = (item, index) => {
    setEditingIndex(index);
    setEditItem(item);
    setEditQty(item.quantity);
    setEditSize(item.size);
    setEditColor(item.color);
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    const newItems = [...cartItems];
    newItems[editingIndex] = {
      ...newItems[editingIndex],
      quantity: editQty,
      size: editSize,
      color: editColor
    };
    updateCartStorage(newItems);
    setIsEditModalOpen(false);
    showToast("Item updated successfully!", "success");
  };

  const getEditSizeOptions = () => {
    if (!editItem) return [];
    const isShoe = !isNaN(parseFloat(editSize)); 
    if (isShoe) {
      return ["5", "6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"];
    } else {
      return ["S", "M", "L", "XL"];
    }
  };

  return (
    <div className="cart-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <Navbar />

      <div className="cart-content">
        <div className="cart-box">
          
          <div className="cart-title">Your Shopping Cart</div>

          {cartItems.length > 0 && (
            <div className="select-all-container">
              <input 
                type="checkbox" 
                className="cart-item-checkbox" 
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
              <span className="select-all-text">Select All ({cartItems.length} items)</span>
            </div>
          )}

          <div className="cart-lists-section">
            {cartItems.length === 0 ? (
              <div style={{textAlign: 'center', marginTop: '50px', color: '#555'}}>
                <h2>Your cart is empty.</h2>
                <p>Go to Home to shop!</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className={`cart-item ${selectedIndices.includes(index) ? 'selected-row' : ''}`}>
                  
                  <div style={{display:'flex', alignItems:'center'}}>
                    <input 
                        type="checkbox" 
                        className="cart-item-checkbox" 
                        checked={selectedIndices.includes(index)}
                        onChange={() => toggleSelect(index)}
                    />
                    
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="cart-item-img"
                      onError={(e) => e.target.src = "/assets/mascot.png"} 
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-details">
                      {item.size} | {item.color} 
                      <button 
                        className="cart-item-edit-btn"
                        style={{marginLeft:'10px'}}
                        onClick={() => openEditModal(item, index)}
                      >
                        Edit
                      </button>
                    </div>
                    <div style={{fontWeight: 'bold', marginTop: '2px', color: '#444'}}>
                      ₱{item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="quantity-box">
                    <button className="qty-btn" onClick={() => handleQuantity(index, -1)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleQuantity(index, 1)}>+</button>
                  </div>
                  
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-checkout-section">
            <button className="cart-checkout-btn" onClick={initiateCheckout}>
              CHECKOUT NOW
            </button>
          </div>

        </div>
      </div>

      {/* --- CHECKOUT CONFIRMATION MODAL --- */}
      {showCheckoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowCheckoutConfirm(false)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper" style={{background: '#2ecc71'}}>
                <span className="success-icon">🛍️</span>
            </div>
            
            <h3>Proceed to Checkout?</h3>
            <p>You have selected <b>{selectedIndices.length}</b> items to purchase.</p>
            
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setShowCheckoutConfirm(false)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={proceedToCheckout}>Yes, Proceed</button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {isEditModalOpen && editItem && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>✕</button>

            <div className="modal-left">
              <img src={editItem.img} alt={editItem.name} className="modal-img" onError={(e) => e.target.src = "/assets/mascot.png"} />
            </div>

            <div className="modal-right">
              <h2 className="modal-title">{editItem.name}</h2>
              <div className="modal-price">₱{editItem.price.toLocaleString()}</div>
              
              <span className="option-label">Edit Size</span>
              <div className="size-selector">
                {getEditSizeOptions().map(s => (
                  <button 
                    key={s} 
                    className={`size-btn ${editSize === s ? "selected" : ""}`} 
                    onClick={() => setEditSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <span className="option-label">Edit Color</span>
              <div className="color-selector">
                {["black", "red", "white", "blue"].map(c => (
                  <div 
                    key={c} 
                    className={`color-btn ${editColor === c ? "selected" : ""}`} 
                    style={{backgroundColor: c}} 
                    onClick={() => setEditColor(c)} 
                  />
                ))}
              </div>

              <div className="modal-actions">
                <div className="modal-qty">
                  <button onClick={() => setEditQty(Math.max(1, editQty - 1))}>-</button>
                  <span>{editQty}</span>
                  <button onClick={() => setEditQty(editQty + 1)}>+</button>
                </div>
                <button className="modal-add-btn" onClick={saveEdit}>
                  SAVE CHANGES
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <footer className="cart-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}