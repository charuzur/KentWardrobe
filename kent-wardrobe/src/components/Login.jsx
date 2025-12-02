import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import "../css/App.css";     
import "../css/Login.css";   

import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", username, password); 
    navigate("/"); 
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="box">
        <div className="login-left">
          <h2 className="login-title">Login</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* --- NEW SECTION: SWITCH TO SIGNUP --- */}
          <div className="form-footer">
            <p>Don't have an account? <Link to="/signup" className="form-link">Sign Up</Link></p>
          </div>

        </div>

        <div className="divider"></div>

        <div className="login-right">
             <img src={logo} alt="Kent's Wardrobe Logo" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;