import React, { useState } from "react";
import "../css/Pages.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login successful!");
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-box">
        {/* Left side - Login Form */}
        <div className="auth-left">
          <h2 className="auth-title">Welcome Back</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="auth-divider"></div>

        {/* Right side - Logo */}
        <div className="auth-right">
          <img src={logo} alt="Kent's Wardrobe Logo" className="auth-logo" />
          <p style={{ fontSize: "1.1rem", color: "#2e2e2e", marginTop: "20px", fontWeight: "600" }}>
            Your Style, Your Story
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
