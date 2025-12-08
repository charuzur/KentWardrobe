import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; 
import "../css/App.css";
import "../css/Profile.css"; 
import "../css/Toast.css"; 

// NO IMAGE IMPORTS

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // --- CONFIRMATION STATES ---
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // --- TOAST STATE ---
  const [notification, setNotification] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const [user, setUser] = useState({
    id: null,
    fullName: "",
    email: "",
    birthday: "", 
    contactNumber: "",
    address: "",
    profileImage: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, profileImage: reader.result }));
        if (!isEditing) setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // ==========================================
  // --- LOGIC 1: SAVE PROFILE DETAILS ---
  // ==========================================
  
  // Step 1: Click "Save Changes" -> Validates & Opens Modal
  const initiateSave = () => {
    if (isEditing) {
      if (!user.fullName || !user.contactNumber || !user.address) {
        showToast("Full Name, Contact, and Address are required!", "error");
        return;
      }
      // Open Confirmation
      setShowConfirmSave(true);
    } else {
      setIsEditing(true);
    }
  };

  // Step 2: Click "Yes" in Modal -> Sends Data
  const performProfileUpdate = () => {
    fetch(`http://localhost:8080/api/users/update/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(updatedUser => {
      showToast("Profile Updated Successfully!", "success");
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      setShowConfirmSave(false); // Close Modal
    })
    .catch(error => {
      console.error("Error updating profile:", error);
      showToast("Failed to update profile.", "error");
      setShowConfirmSave(false);
    });
  };

  // ==========================================
  // --- LOGIC 2: CHANGE PASSWORD ---
  // ==========================================

  // Step 1: Click "Update Password" -> Validates & Opens Confirmation
  const initiatePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        showToast("Please fill in all fields", "error");
        return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        showToast("New passwords do not match", "error");
        return;
    }
    // Open Confirmation
    setShowConfirmPass(true);
  };

  // Step 2: Click "Yes" -> Sends Data
  const performPasswordUpdate = () => {
    const payload = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
    };

    fetch(`http://localhost:8080/api/users/change-password/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(async response => {
        if (response.ok) {
            showToast("Password Changed Successfully!", "success");
            setShowPasswordModal(false);
            setShowConfirmPass(false);
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            const text = await response.text();
            showToast(text || "Failed to change password", "error");
            setShowConfirmPass(false);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showToast("Server error", "error");
        setShowConfirmPass(false);
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="profile-container" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      <Navbar />

      <div className="profile-content">
        <div className="profile-box">
          
          <div className="profile-left">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: "none" }} 
              accept="image/*"
              onChange={handleFileChange}
            />
            <img 
              src={user.profileImage || "/assets/mascot.png"} 
              alt="Profile" 
              className="profile-avatar" 
            />
            
            {isEditing && (
              <>
                <button className="profile-edit-btn" onClick={triggerFileInput}>
                  CHANGE PHOTO
                </button>
                <button className="btn-change-pass" onClick={() => setShowPasswordModal(true)}>
                  🔒 Change Password
                </button>
              </>
            )}
          </div>

          <div className="profile-right">
            <div className="profile-header-section">
              <h1 className="profile-header">My Profile</h1>
              <button 
                className={`action-btn ${isEditing ? "save" : ""}`} 
                onClick={initiateSave}
              >
                {isEditing ? "Save Changes" : "Edit Details ✎"}
              </button>
            </div>
            
            <div className="profile-grid">
              <div className="profile-field full-width">
                <div className="field-label">Full Name <span style={{color:'red'}}>*</span></div>
                {isEditing ? (
                  <input type="text" name="fullName" value={user.fullName || ""} onChange={handleChange} className="profile-input" placeholder="Required" />
                ) : (
                  <div className="field-value">{user.fullName || "Not Set"}</div>
                )}
              </div>

              <div className="profile-field full-width">
                <div className="field-label">Email Address</div>
                {isEditing ? (
                  <input type="email" name="email" value={user.email || ""} onChange={handleChange} className="profile-input" />
                ) : (
                  <div className="field-value">{user.email}</div>
                )}
              </div>

              <div className="profile-field">
                <div className="field-label">Birthday</div>
                {isEditing ? (
                  <input type="date" name="birthday" value={user.birthday || ""} onChange={handleChange} className="profile-input" />
                ) : (
                  <div className="field-value">{formatDate(user.birthday)}</div>
                )}
              </div>

              <div className="profile-field">
                <div className="field-label">Contact <span style={{color:'red'}}>*</span></div>
                {isEditing ? (
                  <input type="text" name="contactNumber" value={user.contactNumber || ""} onChange={handleChange} className="profile-input" placeholder="Required" />
                ) : (
                  <div className="field-value">{user.contactNumber || "Not Set"}</div>
                )}
              </div>

              <div className="profile-field full-width">
                <div className="field-label">Shipping Address <span style={{color:'red'}}>*</span></div>
                {isEditing ? (
                  <input type="text" name="address" value={user.address || ""} onChange={handleChange} className="profile-input" placeholder="Required" />
                ) : (
                  <div className="field-value">{user.address || "Not Set"}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHANGE PASSWORD FORM MODAL --- */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="product-modal password-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPasswordModal(false)}>✕</button>
            <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#333'}}>Change Password</h2>
            
            <div className="form-group">
                <label className="field-label">Current Password</label>
                <input type="password" name="currentPassword" className="profile-input" value={passwordData.currentPassword} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <label className="field-label">New Password</label>
                <input type="password" name="newPassword" className="profile-input" value={passwordData.newPassword} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <label className="field-label">Confirm New Password</label>
                <input type="password" name="confirmPassword" className="profile-input" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
            </div>
            
            <div className="modal-actions" style={{marginTop: '20px'}}>
                <button className="modal-add-btn" onClick={initiatePasswordChange} style={{width: '100%'}}>
                   UPDATE PASSWORD
                </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 1. PROFILE SAVE CONFIRMATION POPUP --- */}
      {showConfirmSave && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3 className="confirm-title">Save Changes?</h3>
            <p className="confirm-text">Are you sure you want to update your profile details?</p>
            <div className="confirm-actions">
              <button className="btn-no" onClick={() => setShowConfirmSave(false)}>Cancel</button>
              <button className="btn-yes" onClick={performProfileUpdate}>Yes, Save</button>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. PASSWORD CHANGE CONFIRMATION POPUP --- */}
      {showConfirmPass && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3 className="confirm-title">Update Password?</h3>
            <p className="confirm-text">You will need to use this new password next time you login.</p>
            <div className="confirm-actions">
              <button className="btn-no" onClick={() => setShowConfirmPass(false)}>Cancel</button>
              <button className="btn-yes" onClick={performPasswordUpdate}>Yes, Update</button>
            </div>
          </div>
        </div>
      )}

      <footer className="profile-footer">
        © 2025 KentWardrobe, Inc. All rights reserved
      </footer>
    </div>
  );
}