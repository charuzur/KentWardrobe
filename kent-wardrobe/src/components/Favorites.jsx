import React, { useState, useEffect } from "react";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Homepage.css"; 
import "../css/Toast.css"; 

// NO IMAGE IMPORTS

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // --- CONFIRMATION STATES ---
  const [removeTarget, setRemoveTarget] = useState(null); // For "X" click
  const [moveTarget, setMoveTarget] = useState(null); // For "Move to Cart" confirmation

  // Modal States for Selection
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("black");

  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
        setFavorites([]); // Clear state immediately to avoid ghosting
        fetch(`http://localhost:8080/api/wishlist/${user.id}`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) {
                setFavorites(data);
            }
          })
          .catch(err => console.error(err));
    }
  }, []);

  // --- EXECUTE REMOVE ---
  const executeRemove = () => {
    if (!removeTarget) return;
    const user = JSON.parse(localStorage.getItem("user"));
    
    fetch("http://localhost:8080/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId: removeTarget.id })
    })
    .then(() => {
        setFavorites(favorites.filter(item => item.id !== removeTarget.id));
        showToast("Removed from Wishlist", "error");
        setRemoveTarget(null);
    });
  };

  // --- EXECUTE MOVE TO CART ---
  const executeMoveToCart = () => {
    if (!moveTarget) return;

    // 1. Add to Cart
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = moveTarget; // moveTarget already has size/color/qty from previous step
    
    const existingIndex = currentCart.findIndex(item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color);
    if (existingIndex > -1) {
        currentCart[existingIndex].quantity += newItem.quantity;
    } else {
        currentCart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // 2. Remove from DB Wishlist
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:8080/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId: newItem.id })
    }).then(() => {
        setFavorites(favorites.filter(item => item.id !== newItem.id));
        showToast("Moved to Cart Successfully!", "success");
        setMoveTarget(null);
    });
  };

  // --- UI TRIGGERS ---
  const openSelectionModal = (product) => {
    setSelectedProduct(product);
    setQty(1);
    setSize(product.type === "shoe" ? "7" : "M"); 
    setColor("black"); 
  };
  
  // Called when "Confirm" is clicked inside the Selection Modal
  const handleSelectionConfirm = () => {
    // Instead of moving immediately, set the target for the FINAL confirmation modal
    setMoveTarget({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        img: selectedProduct.img,
        quantity: qty,
        size: size,
        color: color
    });
    setSelectedProduct(null); // Close selection modal
  };

  const getSizeOptions = () => {
    if (!selectedProduct) return [];
    if (selectedProduct.type === "shoe") return ["5", "6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"];
    return ["S", "M", "L", "XL"];
  };

  return (
    <div className="home-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      {notification.message && <div className={`glass-toast toast-${notification.type}`}>{notification.type === 'success' ? '✓' : '✕'} {notification.message}</div>}
      <Navbar />

      <div className="banner-wrapper" style={{height: '120px', background: 'rgba(255, 255, 255, 0.50)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.20)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px'}}>
        <h1 style={{color: '#2e2e2e', fontSize: '2.5rem', margin: 0, fontFamily: "'Alpha Slab One', cursive", letterSpacing: '2px', textTransform: 'uppercase'}}>My Wishlist</h1>
      </div>

      <div className="product-grid">
        {favorites.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: '50px'}}><h2>Your wishlist is empty.</h2></div>
        ) : (
          favorites.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && <div className={`card-badge ${product.badge.toLowerCase().replace(" ","-")}`}>{product.badge}</div>}
              
              <div className="card-wishlist" style={{color: '#FF6B6B', fontWeight: 'bold', fontSize: '1.2rem'}} 
                   onClick={(e) => { e.stopPropagation(); setRemoveTarget(product); }} title="Remove">
                ✕
              </div>
              
              <img src={product.img} alt={product.name} />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">₱{product.price.toLocaleString()}</div>
              
              <button className="add-btn" onClick={() => openSelectionModal(product)}>MOVE TO CART</button>
            </div>
          ))
        )}
      </div>

      {/* 1. SELECTION MODAL (Step 1 of Moving) */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-left"><img src={selectedProduct.img} alt={selectedProduct.name} className="modal-img" /></div>
            <div className="modal-right">
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <div className="modal-price">₱{selectedProduct.price.toLocaleString()}</div>
              <p className="modal-desc">{selectedProduct.description}</p> 
              <span className="option-label">Select Size</span>
              <div className="size-selector">{getSizeOptions().map(s => <button key={s} className={`size-btn ${size === s ? "selected" : ""}`} onClick={() => setSize(s)}>{s}</button>)}</div>
              <span className="option-label">Select Color</span>
              <div className="color-selector">{["black", "red", "white", "blue"].map(c => <div key={c} className={`color-btn ${color === c ? "selected" : ""}`} style={{backgroundColor: c}} onClick={() => setColor(c)} />)}</div>
              <div className="modal-actions">
                <div className="modal-qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
                <button className="modal-add-btn" onClick={handleSelectionConfirm}>CONTINUE</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. REMOVE CONFIRMATION */}
      {removeTarget && (
        <div className="modal-overlay" onClick={() => setRemoveTarget(null)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper" style={{background: '#e74c3c'}}><span className="success-icon">✕</span></div>
            <h3>Remove Item?</h3>
            <p>Are you sure you want to remove <b>{removeTarget.name}</b> from your wishlist?</p>
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setRemoveTarget(null)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={executeRemove}>Yes, Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MOVE TO CART CONFIRMATION */}
      {moveTarget && (
        <div className="modal-overlay" onClick={() => setMoveTarget(null)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper" style={{background: '#2ecc71'}}><span className="success-icon">🛍️</span></div>
            <h3>Move to Cart?</h3>
            <p>This will move <b>{moveTarget.quantity}x {moveTarget.name}</b> ({moveTarget.size}/{moveTarget.color}) to your cart and remove it from here.</p>
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setMoveTarget(null)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={executeMoveToCart}>Yes, Move it</button>
            </div>
          </div>
        </div>
      )}

      <footer className="home-footer">© 2025 KentWardrobe, Inc. All rights reserved</footer>
    </div>
  );
}