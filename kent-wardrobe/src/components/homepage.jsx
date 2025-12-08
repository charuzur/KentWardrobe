import React, { useState, useEffect } from "react";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Homepage.css";
import "../css/Toast.css"; 

// NO IMAGE IMPORTS

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- STATES ---
  const [wishlistIds, setWishlistIds] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  
  // Confirmation State
  const [wishlistConfirm, setWishlistConfirm] = useState(null); // { product, type: 'add'|'remove' }

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("black");

  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => console.error(err));

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        fetch(`http://localhost:8080/api/wishlist/${user.id}`)
          .then(res => res.json())
          .then(data => setWishlistIds(data.map(p => p.id)));
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setQty(1);
    setSize(product.type === "shoe" ? "7" : "M"); 
    setColor("black"); 
  };
  const closeModal = () => setSelectedProduct(null);

  const getSizeOptions = () => {
    if (!selectedProduct) return [];
    if (selectedProduct.type === "shoe") return ["5", "6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"];
    return ["S", "M", "L", "XL"];
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(item => item.id === selectedProduct.id && item.size === size && item.color === color);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...existingCart];
      updatedCart[existingIndex].quantity += qty;
    } else {
      const newItem = { id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, img: selectedProduct.img, quantity: qty, size: size, color: color };
      updatedCart = [...existingCart, newItem];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showToast("Added to Cart Successfully!", "success");
    closeModal();
  };

  const quickAdd = (e, product) => {
    e.stopPropagation(); 
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const defaultSize = product.type === "shoe" ? "7" : "M";
    const defaultColor = "black";
    const existingIndex = existingCart.findIndex(item => item.id === product.id && item.size === defaultSize && item.color === defaultColor);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...existingCart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      const newItem = { id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1, size: defaultSize, color: defaultColor };
      updatedCart = [...existingCart, newItem];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showToast("Quick Add Successful!", "success");
  };

  // --- 1. CLICK TRIGGER: ASK CONFIRMATION ---
  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        showToast("Please Login to use Wishlist", "error");
        return;
    }
    const isLiked = wishlistIds.includes(product.id);
    // Open Confirmation
    setWishlistConfirm({ 
        product: product, 
        type: isLiked ? 'remove' : 'add',
        user: user 
    });
  };

  // --- 2. EXECUTE AFTER CONFIRM ---
  const executeWishlistToggle = () => {
    if (!wishlistConfirm) return;

    fetch("http://localhost:8080/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: wishlistConfirm.user.id, productId: wishlistConfirm.product.id })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Added") {
            setWishlistIds([...wishlistIds, wishlistConfirm.product.id]);
            showToast("Added to Wishlist!", "success");
        } else {
            setWishlistIds(wishlistIds.filter(id => id !== wishlistConfirm.product.id));
            showToast("Removed from Wishlist", "error");
        }
        setWishlistConfirm(null); // Close Modal
    });
  };

  return (
    <div className="home-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>{notification.type === 'success' ? '✓' : '✕'} {notification.message}</div>
      )}
      <Navbar />

      <div className="banner-wrapper">
        <img src="/assets/products/sale-banner.png" alt="sale banner" className="banner-img" onError={(e) => e.target.style.display = 'none'} /> 
      </div>
      <div className="search-section">
        <input type="text" placeholder="Search for clothes..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="category-filter">
        {["All", "Men", "Women"].map((cat) => (
          <button key={cat} className={`category-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {loading ? (
          <div style={{color: 'white', textAlign: 'center', fontSize: '1.5rem', gridColumn: '1/-1', marginTop: '50px'}}>Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => openModal(product)}>
              {product.badge && <div className={`card-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>{product.badge}</div>}
              
              <div 
                className="card-wishlist" 
                onClick={(e) => handleWishlistClick(e, product)}
                style={{
                    color: wishlistIds.includes(product.id) ? '#FF6B6B' : '#ccc',
                    fontWeight: wishlistIds.includes(product.id) ? 'bold' : 'normal'
                }}
              >
                ♥
              </div>
              
              <img src={product.img} alt={product.name} />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">₱{product.price.toLocaleString()}</div>
              <button className="add-btn" onClick={(e) => quickAdd(e, product)}>QUICK ADD</button>
            </div>
          ))
        ) : (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: 'rgba(255,255,255,0.8)', padding: '50px'}}><h2>No items found.</h2></div>
        )}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-left"><img src={selectedProduct.img} alt={selectedProduct.name} className="modal-img" /></div>
            <div className="modal-right">
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <div className="modal-price">₱{selectedProduct.price.toLocaleString()}</div>
              <p className="modal-desc">{selectedProduct.description}</p> 
              <span className="option-label">Select Size</span>
              <div className="size-selector">
                {getSizeOptions().map(s => <button key={s} className={`size-btn ${size === s ? "selected" : ""}`} onClick={() => setSize(s)}>{s}</button>)}
              </div>
              <span className="option-label">Select Color</span>
              <div className="color-selector">
                {["black", "red", "white", "blue"].map(c => <div key={c} className={`color-btn ${color === c ? "selected" : ""}`} style={{backgroundColor: c}} onClick={() => setColor(c)} />)}
              </div>
              <div className="modal-actions">
                <div className="modal-qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
                <button className="modal-add-btn" onClick={addToCart}>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION POPUP FOR WISHLIST --- */}
      {wishlistConfirm && (
        <div className="modal-overlay" onClick={() => setWishlistConfirm(null)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper" style={{background: wishlistConfirm.type === 'add' ? '#2ecc71' : '#e74c3c'}}>
                <span className="success-icon">{wishlistConfirm.type === 'add' ? '♥' : '✕'}</span>
            </div>
            
            <h3>{wishlistConfirm.type === 'add' ? 'Add to Wishlist?' : 'Remove from Wishlist?'}</h3>
            <p>
                {wishlistConfirm.type === 'add' 
                    ? `Do you want to save ${wishlistConfirm.product.name} to your favorites?`
                    : `Are you sure you want to remove ${wishlistConfirm.product.name}?`
                }
            </p>
            
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setWishlistConfirm(null)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={executeWishlistToggle}>
                {wishlistConfirm.type === 'add' ? 'Yes, Add it' : 'Yes, Remove it'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="home-footer">© 2025 KentWardrobe, Inc. All rights reserved</footer>
    </div>
  );
}