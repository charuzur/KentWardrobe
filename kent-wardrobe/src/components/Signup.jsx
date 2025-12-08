import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../css/App.css";
import "../css/SignUp.css";
import "../css/Toast.css"; // Import the new Toast styles

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // TOAST STATE
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Helper to show toast
  const showToast = (message, type) => {
    setNotification({ message, type });
    // Hide after 3 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    const userPayload = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload)
    })
    .then(response => {
      if (response.ok) {
        showToast("Registration Successful! Redirecting...", "success");
        // Delay redirect slightly so user sees the message
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showToast("Username or Email already exists.", "error");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      showToast("Cannot connect to server.", "error");
    });
  };

  return (
    <div className="container" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
      
      {/* --- TOAST NOTIFICATION COMPONENT --- */}
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
          {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <div className="box">
        <div className="signup-left">
          <img src="/assets/logo.png" alt="Kent's Wardrobe Logo" className="logo" />
        </div>

        <div className="divider"></div>

        <div className="signup-right">
          <img src="/assets/mascot.png" alt="Mascot" className="mascot" />
          <h2 className="signup-title">Sign Up</h2>

          <form className="signup-form" onSubmit={handleSignup}>
            <label>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="Enter username" 
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter email" 
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter password" 
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <div className="form-footer">
            <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
};