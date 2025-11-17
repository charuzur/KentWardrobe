import React from "react";
import "../css/App.css"; // Make sure your CSS matches the design
import logo from "../assets/mascot.png"; // replace with your logo
import bgImage from "../assets/bg.jpg"; // optional background
import { NavLink } from 'react-router-dom';


export default function MenPage() {
  const products = [
    { name: "Vans Old Skool", price: "$1,000.00" },
    { name: "Nike Jordans", price: "$10,000.00" },
    { name: "Onitsuka Tokuten", price: "$6,000.00" },
    { name: "Puma Speedcat", price: "$12,000.00" },
    { name: "Strides Hoodie", price: "$1,500.00" },
    { name: "White Pants", price: "$5,500.00" },
    { name: "Workation Hoodie", price: "$1,000.00" },
    { name: "L.A Oversize Tee", price: "$700.00" },
  ];

  return (
    <div
      className="men-page-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <button className="gender-btn">WOMEN</button>
          <button className="gender-btn active">MEN</button>
          <NavLink to="/" className="nav-btn">HOME</NavLink>
          <NavLink to="/transactions" className="nav-btn">TRANSACTION HISTORY</NavLink>
          <NavLink to="/profile" className="nav-btn">PROFILE</NavLink>
          <NavLink to="/cart" className="nav-btn">CART</NavLink>
          <NavLink to="/login" className="nav-btn">LOGOUT</NavLink>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </nav>

      {/* PROMO BANNER */}
      <div className="promo-banner">
        <p>New Members Enjoy 15% Off On Kent’s Wardrobe. Use Code: Abadiaknows12</p>
        {/* You can add images inside this banner as needed */}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              {/* Placeholder, replace with actual images */}
              <img src={`https://via.placeholder.com/150`} alt={product.name} />
            </div>
            <div className="product-info">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
