import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png"; 
import '../css/Navbar.css'; 

export default function Navbar() {
  return (
    <nav className="glass-navbar">
      
      {/* Logo Wrapper */}
      <div className="nav-logo-section">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>

      {/* Navigation Buttons */}
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>HOME</NavLink>
        <NavLink to="/transactions" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>HISTORY</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>WISHLIST</NavLink>
        <NavLink to="/profile" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>PROFILE</NavLink>
        <NavLink to="/cart" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>CART</NavLink>
        <NavLink to="/login" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>LOGOUT</NavLink>
      </div>
    </nav>
  );
}