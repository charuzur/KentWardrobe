import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// NO IMAGE IMPORTS
import '../css/Navbar.css'; 

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userRole, setUserRole] = useState("user");

  // Check Role on Load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role);
    }
  }, []);

  const handleLogoutClick = (e) => {
    e.preventDefault(); 
    setShowLogoutConfirm(true); 
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="glass-navbar">
        
        <div className="nav-logo-section">
          <img src="/assets/logo.png" alt="Logo" className="nav-logo" />
        </div>

        <div className="nav-links">
          
          {/* --- ADMIN BUTTON (Only shows if role is admin) --- */}
          {userRole === 'admin' && (
             <NavLink to="/admin" className={({ isActive }) => "nav-btn-admin" + (isActive ? " active" : "")}>
                DASHBOARD
             </NavLink>
          )}

          <NavLink to="/" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>HOME</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>HISTORY</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>WISHLIST</NavLink>
          <NavLink to="/profile" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>PROFILE</NavLink>
          <NavLink to="/cart" className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}>CART</NavLink>
          
          <button className="nav-btn" onClick={handleLogoutClick}>
            LOGOUT
          </button>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="logout-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="logout-title">Signing Out?</h3>
            <p className="logout-desc">Are you sure you want to log out of your account?</p>
            
            <div className="logout-actions">
              <button className="btn-cancel-logout" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="btn-confirm-logout" onClick={confirmLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}