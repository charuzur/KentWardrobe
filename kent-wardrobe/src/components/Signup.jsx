import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";
import "../css/SignUp.css";
import logo from "../assets/logo.png"; 
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

const SignUp = () => {
  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="box">
        <div className="signup-left">
          <img src={logo} alt="Kent's Wardrobe Logo" className="logo" />
        </div>

        <div className="divider"></div>

        <div className="signup-right">
          <img src={mascot} alt="Mascot" className="mascot" />
          <h2 className="signup-title">Sign Up</h2>

          <form className="signup-form">
            <label>Username</label>
            <input type="text" placeholder="Enter username" />

            <label>Email</label>
            <input type="email" placeholder="Enter email" />

            <label>Password</label>
            <input type="password" placeholder="Enter password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {/* --- NEW SECTION: SWITCH TO LOGIN --- */}
          <div className="form-footer">
            <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;