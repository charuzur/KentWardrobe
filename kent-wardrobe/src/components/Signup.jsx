import React, { useState } from "react";
import "../css/Pages.css";
import logo from "../assets/logo.png"; 
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Sign up successful!");
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-box">
        <div className="auth-left">
          <img src={logo} alt="Kent's Wardrobe Logo" className="auth-logo" />
          <p style={{ fontSize: "1.1rem", color: "#2e2e2e", marginTop: "20px", fontWeight: "600" }}>
            Join Our Community
          </p>
        </div>

        <div className="auth-divider"></div>

        <div className="auth-right">
          <img src={mascot} alt="Mascot" className="auth-mascot" />
          <h2 className="auth-title">Create Account</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="Choose a username" 
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
