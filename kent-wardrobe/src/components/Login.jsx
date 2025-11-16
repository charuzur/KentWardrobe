import React from "react";
import "../css/App.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="box">
        {/* Left side - Login Form */}
        <div className="login-left">
          <h2 className="login-title">Login</h2>

          <form className="login-form">
            <label>Username</label>
            <input type="text" placeholder="Enter username" />

            <label>Password</label>
            <input type="password" placeholder="Enter password" />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Right side - Logo */}
        <div className="login-right">
          <img src={logo} alt="Kent's Wardrobe Logo" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
