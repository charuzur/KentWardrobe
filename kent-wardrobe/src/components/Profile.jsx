import React, { useState } from "react";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Profile.css"; 

import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function Profile() {
  // 1. State to toggle Edit Mode
  const [isEditing, setIsEditing] = useState(false);

  // 2. State to hold user data
  const [user, setUser] = useState({
    fullName: "Kent Abadiano",
    email: "kent.abadiano@example.com",
    // NOTE: Date must be YYYY-MM-DD for the date picker to read it correctly
    birthday: "1998-01-20", 
    contact: "0912-345-6789",
    address: "Cebu City, Philippines"
  });

  // 3. Handle typing in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 4. Toggle function
  const toggleEdit = () => {
    if (isEditing) {
      console.log("Saved Data:", user);
    }
    setIsEditing(!isEditing);
  };

  // Helper to make the date look nice in View Mode (e.g. "January 20, 1998")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="profile-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      <Navbar />

      <div className="profile-content">
        <div className="profile-box">
          
          {/* LEFT SIDE: AVATAR */}
          <div className="profile-left">
            <img src={mascot} alt="Profile" className="profile-avatar" />
            <button className="profile-edit-btn">CHANGE PHOTO</button>
          </div>

          {/* RIGHT SIDE: INFO */}
          <div className="profile-right">
            
            {/* Header with Toggle Button */}
            <div className="profile-header-section">
              <h1 className="profile-header">My Profile</h1>
              <button 
                className={`action-btn ${isEditing ? "save" : ""}`} 
                onClick={toggleEdit}
              >
                {isEditing ? "Save Changes" : "Edit Details ✎"}
              </button>
            </div>
            
            {/* GRID CONTAINER */}
            <div className="profile-grid">
              
              {/* Full Name */}
              <div className="profile-field full-width">
                <div className="field-label">Full Name</div>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="fullName" 
                    value={user.fullName} 
                    onChange={handleChange} 
                    className="profile-input"
                  />
                ) : (
                  <div className="field-value">{user.fullName}</div>
                )}
              </div>

              {/* Email */}
              <div className="profile-field full-width">
                <div className="field-label">Email Address</div>
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={handleChange} 
                    className="profile-input"
                  />
                ) : (
                  <div className="field-value">{user.email}</div>
                )}
              </div>

              {/* Birthday (DATE PICKER ADDED HERE) */}
              <div className="profile-field">
                <div className="field-label">Birthday</div>
                {isEditing ? (
                  <input 
                    type="date"  // <--- CHANGED TO DATE
                    name="birthday" 
                    value={user.birthday} 
                    onChange={handleChange} 
                    className="profile-input"
                  />
                ) : (
                  // Display formatted text when not editing
                  <div className="field-value">{formatDate(user.birthday)}</div>
                )}
              </div>

              {/* Contact */}
              <div className="profile-field">
                <div className="field-label">Contact</div>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="contact" 
                    value={user.contact} 
                    onChange={handleChange} 
                    className="profile-input"
                  />
                ) : (
                  <div className="field-value">{user.contact}</div>
                )}
              </div>

              {/* Address */}
              <div className="profile-field full-width">
                <div className="field-label">Shipping Address</div>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="address" 
                    value={user.address} 
                    onChange={handleChange} 
                    className="profile-input"
                  />
                ) : (
                  <div className="field-value">{user.address}</div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      <footer className="profile-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}