import React from "react";
import { NavLink } from "react-router-dom";
import "../css/App.css";
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

// SAMPLE PRODUCT IMAGES (replace with your own)
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
  return (
      <div className="cart-container" style={{ backgroundImage: `url(${bgImage})` }}>
        <nav className="cart-navbar">
          <div className="cart-logo-section">
            <img src={mascot} alt="Logo" className="transaction-logo" />
          </div>
          <div className="cart-nav-links">
            <NavLink to="/" className={({ isActive }) => "cart-nav-btn" + (isActive ? " active" : "")}>HOME</NavLink>
            <NavLink to="/transactions" className={({ isActive }) => "cart-nav-btn" + (isActive ? " active" : "")}>TRANSACTION HISTORY</NavLink>
            <NavLink to="/profile" className={({ isActive }) => "cart-nav-btn" + (isActive ? " active" : "")}>PROFILE</NavLink>
            <NavLink to="/cart" className={({ isActive }) => "cart-nav-btn" + (isActive ? " active" : "")}>CART</NavLink>
            <NavLink to="/login" className={({ isActive }) => "cart-nav-btn" + (isActive ? " active" : "")}>LOGOUT</NavLink>
          </div>
        </nav>

      

      {/* SALE BANNER */}
      <div
        style={{
          width: "1800px",
          margin: "20px auto",
          borderRadius: "15px",
          overflow: "hidden",
          background: "rgba(0,0,0,0.5)",
          objectfit: "scale-down"
        }}
      >
        <img src={saleBanner} alt="sale banner" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
      </div>

      {/* PRODUCT GRID */}
      <div
        style={{
          width: "95%",
          margin: "auto",
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          paddingBottom: "50px",
        }}
      >
        {/* PRODUCT CARD TEMPLATE */}
        {[
          { img: vans, name: "Vans Old Skool", price: "₱1,000.00" },
          { img: jordan, name: "Nike Jordans", price: "₱10,000.00" },
          { img: onitsuka, name: "Onitsuka Tokuten", price: "₱6,000.00" },
          { img: puma, name: "Puma Speedcat", price: "₱12,000.00" },
          { img: hoodie1, name: "Gray Hoodie", price: "₱1,500.00" },
          { img: pants, name: "Olive Green Pants", price: "₱5,500.00" },
          { img: hoodie2, name: "HelloKitty Hoodie", price: "₱1,000.00" },
          { img: shirt, name: "L A Oversize Tee", price: "₱700.00" },
          
        ].map((product, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.4)",
              padding: "10px",
              borderRadius: "15px",
              textAlign: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                height: "120px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{product.name}</h3>
            <p style={{ fontSize: "14px" }}>{product.price}</p>
          </div>
        ))}
      </div>

      <footer
        style={{
          background: "rgba(255,255,255,0.3)",
          padding: "15px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
