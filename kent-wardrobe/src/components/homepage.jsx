import React, { useState } from "react";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Homepage.css";
import bgImage from "../assets/bg.jpg";
import mascot from "../assets/mascot.png"; 

// SAMPLE PRODUCT IMAGES
import vans from "../assets/products/vans.png";
import jordan from "../assets/products/jordan.png";
import onitsuka from "../assets/products/onitsuka.png";
import puma from "../assets/products/puma.png";
import hoodie1 from "../assets/products/hoodie1.png";
import pants from "../assets/products/pants.png";
import hoodie2 from "../assets/products/hoodie2.png";
import shirt from "../assets/products/shirt.png";
import saleBanner from "../assets/products/sale-banner.png";

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- MODAL STATES ---
  const [selectedProduct, setSelectedProduct] = useState(null); // The product currently in the pop-up
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("black");

  const products = [
    { id:1, img: vans, name: "Vans Old Skool", price: "₱1,000.00", category: "Men", badge: "Hot", desc: "Classic skate shoe with iconic sidestripe.", type: "shoe" },
    { id:2, img: jordan, name: "Nike Jordans", price: "₱10,000.00", category: "Men", badge: "New", desc: "High-top retro basketball sneakers.", type: "shoe" },
    { id:3, img: onitsuka, name: "Onitsuka Tokuten", price: "₱6,000.00", category: "Women", badge: "", desc: "Vintage style indoor court shoe.", type: "shoe" },
    { id:4, img: puma, name: "Puma Speedcat", price: "₱12,000.00", category: "Women", badge: "Sale", desc: "Motorsport-inspired low profile sneakers.", type: "shoe" },
    { id:5, img: hoodie1, name: "Gray Hoodie", price: "₱1,500.00", category: "Men", badge: "", desc: "Comfortable fleece pullover hoodie.", type: "clothing" },
    { id:6, img: pants, name: "Olive Green Pants", price: "₱5,500.00", category: "Men", badge: "", desc: "Durable cargo pants with multiple pockets.", type: "clothing" },
    { id:7, img: hoodie2, name: "HelloKitty Hoodie", price: "₱1,000.00", category: "Women", badge: "New", desc: "Cute graphic hoodie for fans.", type: "clothing" },
    { id:8, img: shirt, name: "L A Oversize Tee", price: "₱700.00", category: "Women", badge: "Sale", desc: "Relaxed fit cotton t-shirt.", type: "clothing" },
    { id:9, img: mascot, name: "Mascot Limited Tee", price: "₱850.00", category: "Men", badge: "Limited", desc: "Official Kent's Wardrobe Mascot Tee.", type: "clothing" },
    { id:10, img: mascot, name: "Mascot Sticker Pack", price: "₱150.00", category: "Women", badge: "", desc: "High quality vinyl stickers.", type: "accessory" },
  ];

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // OPEN MODAL
  const openModal = (product) => {
    setSelectedProduct(product);
    setQty(1); // Reset qty
    setSize(product.type === "shoe" ? "7" : "M"); // Reset size based on product type
    setColor("black"); // Reset color
  };

  // Get size options based on product type
  const getSizeOptions = () => {
    if (!selectedProduct) return [];
    if (selectedProduct.type === "shoe") {
      return ["5", "6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"];
    } else {
      return ["S", "M", "L", "XL"];
    }
  };

  // CLOSE MODAL
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      <div className="banner-wrapper">
        <img src={saleBanner} alt="sale banner" className="banner-img" />
      </div>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search for clothes..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="category-filter">
        {["All", "Men", "Women"].map((cat) => (
          <button 
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => openModal(product)} // CLICK CARD TO OPEN MODAL
          >
            {product.badge && <div className={`card-badge ${product.badge.toLowerCase()}`}>{product.badge}</div>}
            <div className="card-wishlist" onClick={(e) => { e.stopPropagation(); alert("Added to Wishlist!"); }}>♥</div>
            
            <img src={product.img} alt={product.name} />
            <h3 className="product-name">{product.name}</h3>
            <div className="product-price">{product.price}</div>
            
            <button className="add-btn">QUICK VIEW</button>
          </div>
        ))}
      </div>

      {/* --- POP-UP MODAL PLATE --- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* Stop propagation so clicking inside the box doesn't close it */}
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close" onClick={closeModal}>✕</button>

            <div className="modal-left">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-img" />
            </div>

            <div className="modal-right">
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <div className="modal-price">{selectedProduct.price}</div>
              <p className="modal-desc">{selectedProduct.desc}</p>

              {/* Size Selector */}
              <span className="option-label">Select Size</span>
              <div className="size-selector">
                {getSizeOptions().map(s => (
                  <button 
                    key={s} 
                    className={`size-btn ${size === s ? "selected" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <div className="modal-qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="modal-add-btn">
                  ADD TO CART
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <footer className="home-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}