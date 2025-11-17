import React from "react";
import { NavLink } from "react-router-dom";
import "../css/App.css";
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";


export default function Profile() {
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
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "80px",
    color: "white",
    backdropFilter: "blur(2px)",
  }}
>

  {/* HEADER */}
  <h1
    style={{
      position: "absolute",
      top: "20px",
      left: "10%",
      transform: "translateX(-50%)",
      fontSize: "40px",
      fontWeight: "bold",
      margin: 0,
    }}
  >
    My Profile
  </h1>

  {/* PROFILE DETAILS */}
  <div style={{ textAlign: "center", marginTop: "20px" }}>

  {/* PROFILE PICTURE + EDIT BUTTON CENTERED */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    }}
  >
    {/* PROFILE PICTURE */}
    <img
      src={mascot}
      alt="Profile"
      style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "4px solid green",
        marginBottom: "15px",
      }}
    />

    {/* EDIT BUTTON */}
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "#ffffff",
        color: "black",
        cursor: "pointer",
        fontWeight: "bold",
        opacity: "50%",
      }}
    >
      Edit
    </button>
  </div>


    {/* NAME */}
    <div style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "50px" }}>
      Kent Abadiano
    </div>

    {/* EMAIL */}
    <div style={{ fontSize: "20px", marginBottom: "30px" }}>
      kent.abadiano@example.ragud
    </div>

    {/* BIRTHDAY */}
    <div style={{ fontSize: "20px", marginBottom: "30px" }}>
      Birthday: January 20, 1998
    </div>

    {/* PHONE NUMBER */}
    <div style={{ fontSize: "20px", marginBottom: "30px" }}>
      Contact: 0912-345-6789
    </div>

    {/* ADDRESS */}
    <div style={{ fontSize: "20px", marginBottom: "30px" }}>
      Address: Cebu City, Philippines
    </div>

  </div>

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
