import React, { useState } from "react";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Homepage.css"; // Reusing the Product Grid styles
import bgImage from "../assets/bg.jpg";

// Sample Images (Ensure these exist in your assets folder)
import vans from "../assets/products/vans.png";
import jordan from "../assets/products/jordan.png";
import hoodie2 from "../assets/products/hoodie2.png";

export default function Favorites() {
  // Mock Data: Items the user "Hearted"
  const [favorites, setFavorites] = useState([
    { id: 1, img: vans, name: "Vans Old Skool", price: "₱1,000.00", badge: "Hot" },
    { id: 2, img: jordan, name: "Nike Jordans", price: "₱10,000.00", badge: "New" },
    { id: 3, img: hoodie2, name: "HelloKitty Hoodie", price: "₱1,000.00", badge: "" },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      {/* --- TITLE PLATE (Matched to Transaction History Style) --- */}
      <div 
        className="banner-wrapper" 
        style={{
          /* Reduced Height */
          height: '120px', 
          
          /* Transaction History Glass Style */
          background: 'rgba(255, 255, 255, 0.50)', 
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.20)',
          
          /* Alignment */
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}
      >
        <h1 style={{
          color: '#2e2e2e', // Dark text matches Transaction Title
          fontSize: '2.5rem', 
          margin: 0,
          fontFamily: "'Alpha Slab One', cursive", 
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          My Wishlist
        </h1>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="product-grid">
        {favorites.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: '50px'}}>
            <h2 style={{fontSize: '2rem'}}>Your wishlist is empty.</h2>
            <p style={{fontSize: '1.2rem'}}>Go back to Home and heart some items!</p>
          </div>
        ) : (
          favorites.map((product) => (
            <div key={product.id} className="product-card">
              
              {/* Badge */}
              {product.badge && (
                <div className={`card-badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </div>
              )}

              {/* REMOVE BUTTON (X) instead of Heart */}
              <div 
                className="card-wishlist" 
                style={{
                    color: '#FF6B6B', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem'
                }}
                onClick={() => removeFavorite(product.id)}
                title="Remove from Wishlist"
              >
                ✕
              </div>

              <img src={product.img} alt={product.name} />
              
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">{product.price}</div>

              <button className="add-btn">
                MOVE TO CART
              </button>
            </div>
          ))
        )}
      </div>

      <footer className="home-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}