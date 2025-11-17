import React from "react";
import { NavLink } from "react-router-dom";
import "../css/App.css";
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";


export default function Homepage() {
  return (
    <div
      className="cart-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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

      {/* CENTER CONTAINER */}
      <div
        style={{
          width: "90%",
          height: "80%",
          backgroundColor: "rgba(112, 112, 112, 0.5)",
          margin: "auto",
          borderRadius: "20px",
          position: "relative", // needed for buttons inside
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2rem",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* BUTTONS INSIDE CENTER CONTAINER */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            gap: "15px",
          }}
        >
           <button
    style={{
      width: "82px",
      height: "65px",
      backgroundColor: "rgba(254, 254, 254, 0.5)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontFamily: "'Alfa Slab One', cursive",
      fontSize: "16px",
      fontWeight: "400", // regular
      color: "black",
    }}
  >
    WOMEN
  </button>

  <button
    style={{
      width: "90px",
      height: "90px",
      backgroundColor: "#000000",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontFamily: "'Alfa Slab One', cursive",
      fontSize: "16px",
      fontWeight: "400", // regular
      color: "white",
    }}
  >
   MEN
  </button>
        </div>

        {/* Center content text */}
        Center Content Here
      </div>

     <footer
        className="cart-footer"
        style={{
          textAlign: "center",
          padding: "10px 0",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
