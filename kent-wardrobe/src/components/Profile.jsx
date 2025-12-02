import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Pages.css";
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

export default function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Kent Abadiano",
    email: "kent.abadiano@example.com",
    birthday: "1998-01-20",
    phone: "+63 912-345-6789",
    address: "Cebu City, Philippines",
    gender: "Male",
    joinDate: "January 2024",
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveProfile = () => {
    setProfileData({ ...editData });
    setShowEditModal(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="cart-navbar-modern">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={mascot} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <h1 style={{ margin: 0, color: '#FBFF89', fontSize: '1.5rem', fontWeight: '700' }}>KentWardrobe</h1>
        </div>
        <div className="cart-nav-modern">
          <NavLink to="/" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>HOME</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>HISTORY</NavLink>
          <NavLink to="/profile" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>PROFILE</NavLink>
          <NavLink to="/cart" className={({ isActive }) => "cart-nav-btn-modern" + (isActive ? " active" : "")}>CART</NavLink>
          <NavLink to="/login" style={{ backgroundColor: 'rgba(220, 100, 100, 0.8)', color: 'white' }} className="cart-nav-btn-modern">LOGOUT</NavLink>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-box">
          <h1 className="profile-title">My Profile</h1>

          <div className="profile-picture-section">
            <img src={mascot} alt="Profile" className="profile-picture" />
            <button className="profile-edit-btn" onClick={() => { setEditData({ ...profileData }); setShowEditModal(true); }}>✏️ Edit Profile</button>
          </div>

          <div className="profile-info-section">
            <div className="profile-info-item">
              <span className="profile-info-label">👤 Full Name</span>
              <span className="profile-info-value">{profileData.fullName}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">📧 Email Address</span>
              <span className="profile-info-value">{profileData.email}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">🎂 Birthday</span>
              <span className="profile-info-value">{new Date(profileData.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">⚧ Gender</span>
              <span className="profile-info-value">{profileData.gender}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">📱 Contact Number</span>
              <span className="profile-info-value">{profileData.phone}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">📍 Address</span>
              <span className="profile-info-value">{profileData.address}</span>
            </div>

            <div className="profile-info-item">
              <span className="profile-info-label">📅 Member Since</span>
              <span className="profile-info-value">{profileData.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(240, 240, 210, 0.98) 0%, rgba(250, 250, 230, 0.98) 100%)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700', color: '#2e2e2e' }}>Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#2e2e2e' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Full Name</label>
                <input type="text" name="fullName" value={editData.fullName} onChange={handleEditChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Gender</label>
                <select name="gender" value={editData.gender} onChange={handleEditChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Email Address</label>
              <input type="email" name="email" value={editData.email} onChange={handleEditChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Birthday</label>
                <input type="date" name="birthday" value={editData.birthday} onChange={handleEditChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Contact Number</label>
                <input type="tel" name="phone" value={editData.phone} onChange={handleEditChange} style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2e2e2e' }}>Address</label>
              <input type="text" name="address" value={editData.address} onChange={handleEditChange} placeholder="Enter your full address" style={{ width: '100%', padding: '12px', border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowEditModal(false)} style={{ padding: '12px 28px', background: 'rgba(200, 200, 200, 0.6)', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.background = 'rgba(180, 180, 180, 0.8)'} onMouseLeave={(e) => e.target.style.background = 'rgba(200, 200, 200, 0.6)'}>
                Cancel
              </button>
              <button onClick={handleSaveProfile} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #FBFF89 0%, #f7f76a 100%)', color: '#2e2e2e', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(251, 255, 137, 0.3)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 16px rgba(251, 255, 137, 0.5)'} onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 12px rgba(251, 255, 137, 0.3)'}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer-modern">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}
