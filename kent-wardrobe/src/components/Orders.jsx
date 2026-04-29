// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import '../css/App.css';
// import '../css/Orders.css';
// import bgImage from "../assets/bg.jpg";

// export default function Orders() {
//   const navigate = useNavigate();
  
//   // Sample orders data - in a real app, this would come from a database
//   const [orders] = useState([
//     {
//       id: 'ORD-1733659200000',
//       date: 'December 8, 2024',
//       time: '02:00 PM',
//       status: 'Delivered',
//       items: [
//         { name: 'New Balance 550', quantity: 1, price: '₱1,000.00' },
//         { name: 'Puma Speedcat', quantity: 1, price: '₱12,000.00' }
//       ],
//       subtotal: 13000,
//       shippingFee: 500,
//       total: 13500,
//       paymentMethod: 'Credit/Debit Card',
//       address: '123 Main Street, Cebu City, Philippines 6000',
//       trackingNumber: 'TRK-2024-001'
//     },
//     {
//       id: 'ORD-1733572800000',
//       date: 'December 7, 2024',
//       time: '10:30 AM',
//       status: 'In Transit',
//       items: [
//         { name: 'Nike Air Max', quantity: 2, price: '₱5,500.00' }
//       ],
//       subtotal: 11000,
//       shippingFee: 500,
//       total: 11500,
//       paymentMethod: 'GCash',
//       address: '456 Business Ave, Cebu City, Philippines 6000',
//       trackingNumber: 'TRK-2024-002'
//     },
//     {
//       id: 'ORD-1733486400000',
//       date: 'December 6, 2024',
//       time: '03:15 PM',
//       status: 'Processing',
//       items: [
//         { name: 'Adidas Ultraboost', quantity: 1, price: '₱8,000.00' }
//       ],
//       subtotal: 8000,
//       shippingFee: 500,
//       total: 8500,
//       paymentMethod: 'Cash on Delivery',
//       address: '123 Main Street, Cebu City, Philippines 6000',
//       trackingNumber: 'TRK-2024-003'
//     },
//     {
//       id: 'ORD-1733400000000',
//       date: 'December 5, 2024',
//       time: '11:45 AM',
//       status: 'Delivered',
//       items: [
//         { name: 'Converse Chuck Taylor', quantity: 1, price: '₱2,500.00' },
//         { name: 'Socks Pack', quantity: 3, price: '₱300.00' }
//       ],
//       subtotal: 3100,
//       shippingFee: 500,
//       total: 3600,
//       paymentMethod: 'Credit/Debit Card',
//       address: '456 Business Ave, Cebu City, Philippines 6000',
//       trackingNumber: 'TRK-2024-004'
//     }
//   ]);

//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Delivered':
//         return '#2ecc71';
//       case 'In Transit':
//         return '#f39c12';
//       case 'Processing':
//         return '#3498db';
//       case 'Cancelled':
//         return '#e74c3c';
//       default:
//         return '#95a5a6';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'Delivered':
//         return '✓';
//       case 'In Transit':
//         return '📦';
//       case 'Processing':
//         return '⏳';
//       case 'Cancelled':
//         return '✕';
//       default:
//         return '•';
//     }
//   };

//   return (
//     <div className="orders-container" style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "fixed", backgroundSize: "cover" }}>
      
//       <Navbar />

//       <div className="orders-content">
//         <div className="orders-box">
          
//           <div className="orders-title">My Orders</div>

//           {orders.length === 0 ? (
//             <div className="no-orders">
//               <p>You haven't placed any orders yet.</p>
//               <button className="btn-shop-now" onClick={() => navigate('/')}>
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="orders-list">
//               {orders.map((order) => (
//                 <div key={order.id} className="order-card">
                  
//                   {/* ORDER HEADER */}
//                   <div 
//                     className="order-header"
//                     onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
//                   >
//                     <div className="order-header-left">
//                       <div className="order-id">Order #{order.id.split('-')[1]}</div>
//                       <div className="order-date">{order.date} at {order.time}</div>
//                     </div>

//                     <div className="order-header-right">
//                       <div 
//                         className="order-status"
//                         style={{ backgroundColor: getStatusColor(order.status) }}
//                       >
//                         <span className="status-icon">{getStatusIcon(order.status)}</span>
//                         <span className="status-text">{order.status}</span>
//                       </div>
//                       <div className="order-total">₱{order.total.toLocaleString()}</div>
//                       <div className="expand-icon">
//                         {expandedOrder === order.id ? '▲' : '▼'}
//                       </div>
//                     </div>
//                   </div>

//                   {/* ORDER DETAILS - EXPANDED */}
//                   {expandedOrder === order.id && (
//                     <div className="order-details">
                      
//                       {/* ITEMS */}
//                       <div className="detail-section">
//                         <h4>Items</h4>
//                         <table className="items-table">
//                           <thead>
//                             <tr>
//                               <th>Product</th>
//                               <th>Quantity</th>
//                               <th>Price</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {order.items.map((item, idx) => (
//                               <tr key={idx}>
//                                 <td>{item.name}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.price}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* PRICING */}
//                       <div className="detail-section pricing">
//                         <div className="price-row">
//                           <span>Subtotal:</span>
//                           <span>₱{order.subtotal.toLocaleString()}</span>
//                         </div>
//                         <div className="price-row">
//                           <span>Shipping Fee:</span>
//                           <span>₱{order.shippingFee.toLocaleString()}</span>
//                         </div>
//                         <div className="price-row total">
//                           <span>Total:</span>
//                           <span>₱{order.total.toLocaleString()}</span>
//                         </div>
//                       </div>

//                       {/* DELIVERY INFO */}
//                       <div className="detail-section">
//                         <h4>Delivery Information</h4>
//                         <div className="info-row">
//                           <span className="label">Address:</span>
//                           <span className="value">{order.address}</span>
//                         </div>
//                         <div className="info-row">
//                           <span className="label">Payment Method:</span>
//                           <span className="value">{order.paymentMethod}</span>
//                         </div>
//                         <div className="info-row">
//                           <span className="label">Tracking Number:</span>
//                           <span className="value tracking">{order.trackingNumber}</span>
//                         </div>
//                       </div>

//                       {/* ACTIONS */}
//                       <div className="order-actions">
//                         <button className="btn-reorder">Reorder</button>
//                         {order.status !== 'Delivered' && (
//                           <button className="btn-cancel-order">✕ Cancel Order</button>
//                         )}
//                       </div>

//                     </div>
//                   )}

//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>

//       <footer className="orders-footer">
//         © 2025 KentWardrobe, Inc. All rights reserved
//       </footer>
//     </div>
//   );
// }
