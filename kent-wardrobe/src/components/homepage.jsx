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
import cross from "../assets/products/cross.png";
import nike1 from "../assets/products/nike1.png";   
import genius from "../assets/products/genius.png"; 
import spezial from "../assets/products/spezial.png";
import brownpants from "../assets/products/brownpants.png"; 
import nike2 from "../assets/products/nike2.png";
import beigepants from "../assets/products/beigepants.png";
import brownpants2 from "../assets/products/brownpants2.png";
import staywild from "../assets/products/staywild.png";
import dress from "../assets/products/dress.png";
import snowghost from "../assets/products/snowghost.png";
import september from "../assets/products/september.png";
import green from "../assets/products/green.png";
import skyblue from "../assets/products/skyblue.png";
import cherry from "../assets/products/cherry.png";


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
    { id:11, img: cross, name: "Black Cross Tee", price: "₱250.00", category: "Men", badge: "", desc: "High quality tees.", type: "clothing" },
    { id:12, img: nike1, name: "Nike Shoes V1", price: "₱3500.00", category: "Men", badge: "", desc: "High quality shoes.", type: "shoe" },
    { id:13, img: genius, name: "Genius 23 Tee", price: "₱150.00", category: "Men", badge: "", desc: "High quality tees.", type: "clothing" },
    { id:14, img: spezial, name: "Adidas Spezial V1", price: "₱4500.00", category: "Men", badge: "", desc: "Classic Special Shoes.", type: "shoe" },
    { id:15, img: brownpants, name: "Cargo Brown Pants", price: "₱950.00", category: "Men", badge: "", desc: "Durable cargo pants with multiple pockets.", type: "clothing" },
    { id:16, img: nike2, name: "Nike Shoes V2", price: "₱4500.00", category: "Men", badge: "", desc: "High quality shoes.", type: "shoe" },
    { id:17, img: beigepants , name: "Beige Pants Special Edition", price: "₱1050.00", category: "Men", badge: "Special Edition", desc: "Special Edition Pants ", type: "clothing" },
    { id:18, img: brownpants2, name: "Classic Brown Pants", price: "₱1050.00", category: "Men", badge: "", desc: "High quality and durable cargo pants", type: "clothing" },
    { id:19, img: staywild, name: "Stay Wild Tees", price: "₱550.00", category: "Women", badge: "", desc: "High quality tees", type: "clothing" },
    { id:20, img: dress, name: "White Elegant Dress", price: "₱1050.00", category: "Women", badge: "", desc: "High quality and elegant dress.", type: "clothing" },
    { id:21, img: snowghost, name: "Snow Ghost Tees", price: "₱850.00", category: "Women", badge: "", desc: "High quality pink tees", type: "clothing" },
    { id:22, img: september, name: "September Croptop Tee", price: "₱850.00", category: "Women", badge: "", desc: "High quality aesthetic croptop", type: "clothing" },
    { id:23, img: green, name: "Green Croptop Tee", price: "₱950.00", category: "Women", badge: "", desc: "High quality aesthetic croptop", type: "clothing" },
    { id:24, img: skyblue, name: "Sky Blue Dress", price: "₱1050.00", category: "Women", badge: "", desc: "Elegant and aesthetic dress.", type: "clothing" },
    { id:25, img: cherry, name: "Cherry Dress", price: "₱1150.00", category: "Women", badge: "", desc: "Elegant and aesthetic dress.", type: "clothing" },
    
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