import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Admin.css";
import "../css/Toast.css";

// NO IMAGE IMPORTS

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  
  // DATA STATES
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  
  // PRODUCT FORM STATE
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null, name: "", price: "", category: "Men", badge: "", description: "", img: "/assets/products/", type: "clothing"
  });

  // CONFIRMATION STATES
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // TOAST STATE
  const [notification, setNotification] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // --- 1. LOAD DATA ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchOrders();
    fetchProducts();
  }, [navigate]);

  const fetchOrders = () => {
    fetch("http://localhost:8080/api/orders/all")
      .then(res => res.json())
      .then(data => setOrders(data.sort((a, b) => b.id - a.id)))
      .catch(err => console.error(err));
  };

  const fetchProducts = () => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  // --- 2. ORDER ACTIONS ---
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:8080/api/orders/status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).then(res => {
      if(res.ok) {
        showToast("Order Status Updated!", "success");
        fetchOrders();
      }
    });
  };

  // --- 3. PRODUCT ACTIONS ---
  const startAddProduct = () => {
    setIsEditingProduct(false);
    setCurrentProduct({ id: null, name: "", price: "", category: "Men", badge: "", description: "", img: "/assets/products/", type: "clothing" });
    setActiveTab("product_form");
  };

  const startEditProduct = (product) => {
    setIsEditingProduct(true);
    setCurrentProduct(product);
    setActiveTab("product_form");
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const method = isEditingProduct ? "PUT" : "POST";
    const url = isEditingProduct 
      ? `http://localhost:8080/api/products/${currentProduct.id}`
      : "http://localhost:8080/api/products";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentProduct)
    })
    .then(res => {
      if (res.ok) {
        showToast(isEditingProduct ? "Product Updated!" : "Product Created!", "success");
        fetchProducts();
        setActiveTab("products"); 
      } else {
        showToast("Failed to save product", "error");
      }
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          showToast("Product Deleted", "success");
          fetchProducts();
        }
      });
    }
  };

  // --- 4. ADMIN ACTIONS (LOGOUT) ---
  const requestLogout = () => {
    setShowLogoutConfirm(true);
  };

  const performLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {notification.message && (
        <div className={`glass-toast toast-${notification.type}`}>
           {notification.type === 'success' ? '✓' : '✕'} {notification.message}
        </div>
      )}

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-logo">ADMIN PANEL</div>
        
        {/* GROUP 1: MAIN NAVIGATION (Stacked Together) */}
        <button className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          📦 Manage Orders
        </button>

        <button className={`sidebar-btn ${activeTab === 'products' || activeTab === 'product_form' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
          👕 Manage Products
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/profile')}>
          👤 My Profile
        </button>

        <button className="sidebar-btn" onClick={() => navigate('/')}>
          🏠 View Live Store
        </button>

        {/* LOGOUT (Stays at bottom automatically via CSS) */}
        <button className="sidebar-btn logout-btn" onClick={requestLogout}>Logout</button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        
        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="admin-header">All Customer Orders</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id} <br/><span style={{fontSize:'0.7rem', color:'#666'}}>{order.trackingNumber}</span></td>
                    <td>{order.customerName}</td>
                    <td>₱{order.totalAmount.toLocaleString()}</td>
                    <td>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="status-select"
                        style={{ borderColor: order.status === 'Delivered' ? '#2ecc71' : '#f39c12' }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PRODUCTS LIST TAB --- */}
        {activeTab === 'products' && (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                <h1 className="admin-header" style={{margin:0, border:0}}>Inventory</h1>
                <button className="btn-add-product" onClick={startAddProduct}>+ Add New Product</button>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                        <img 
                            src={product.img} 
                            alt="" 
                            onError={(e) => e.target.src = "/assets/mascot.png"}
                        />
                    </td>
                    <td>{product.name}</td>
                    <td>₱{product.price.toLocaleString()}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="action-icon edit" onClick={() => startEditProduct(product)}>✎</button>
                      <button className="action-icon delete" onClick={() => handleDeleteProduct(product.id)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ADD/EDIT PRODUCT FORM --- */}
        {activeTab === 'product_form' && (
          <div>
            <h1 className="admin-header">{isEditingProduct ? "Edit Product" : "Add New Product"}</h1>
            <form className="admin-form" onSubmit={handleSaveProduct}>
                
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" className="admin-input" required 
                           value={currentProduct.name} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} />
                </div>
                
                <div className="form-row-2">
                    <div className="form-group">
                        <label>Price (Numbers only)</label>
                        <input type="number" className="admin-input" required 
                               value={currentProduct.price} onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select className="admin-input" value={currentProduct.category} onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea className="admin-input" rows="3" required 
                              value={currentProduct.description} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} />
                </div>

                <div className="form-group">
                    <label>Image Path (e.g. /assets/products/my-image.png)</label>
                    <input type="text" className="admin-input" required 
                           value={currentProduct.img} onChange={(e) => setCurrentProduct({...currentProduct, img: e.target.value})} />
                    <small style={{color:'#666'}}>*Remember to move the actual image file to the public folder!</small>
                </div>

                <div className="form-row-2" style={{marginTop:'20px'}}>
                    <button type="button" className="btn-cancel-admin" onClick={() => setActiveTab('products')}>Cancel</button>
                    <button type="submit" className="btn-save-admin">Save Product</button>
                </div>
            </form>
          </div>
        )}

      </div>

      {/* --- ADMIN LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrapper" style={{background: '#e74c3c'}}>
                <span className="success-icon">🚪</span>
            </div>
            
            <h3>Sign Out?</h3>
            <p>You are about to log out of the Admin Dashboard.</p>
            
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={performLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}