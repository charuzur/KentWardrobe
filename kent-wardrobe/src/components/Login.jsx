import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "../css/App.css";     
import "../css/Login.css";   
import "../css/Toast.css"; // Import Toast CSS

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // TOAST STATE
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginPayload = {
        username: formData.username,
        password: formData.password
    };

    fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload)
    })
    .then(async response => {
        const text = await response.text();
        
        if (!text) {
            showToast("Invalid Username or Password!", "error");
            return;
        }

        const data = JSON.parse(text);
        
        if (data.id) {
            showToast(`Welcome back, ${data.username}!`, "success");
            localStorage.setItem("user", JSON.stringify(data));
            
            // Wait 1 second before redirecting so they see the nice toast
            setTimeout(() => navigate("/"), 1000);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Server error. Is the backend running?", "error");
    });
  };

  return (
    <div className="container" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
      
      {/* --- TOAST NOTIFICATION --- */}
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <div className="box">
        <div className="login-left">
          <h2 className="login-title">Login</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <label>Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="Enter username" 
              value={formData.username}
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

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? <Link to="/signup" className="form-link">Sign Up</Link></p>
          </div>

        </div>

        <div className="divider"></div>

        <div className="login-right">
             <img src="/assets/logo.png" alt="Kent's Wardrobe Logo" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;