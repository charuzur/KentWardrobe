import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/App.css";
import "../css/Homepage.css";
import mascot from "../assets/mascot.png";
import bgImage from "../assets/bg.jpg";

// SAMPLE PRODUCT IMAGES (replace with your own)
import vans from "../assets/products/vans.png";
import jordan from "../assets/products/jordan.png";
import onitsuka from "../assets/products/onitsuka.png";
import puma from "../assets/products/puma.png";
import hoodie1 from "../assets/products/hoodie1.png";
import pants from "../assets/products/pants.png";
import hoodie2 from "../assets/products/hoodie2.png";
import shirt from "../assets/products/shirt.png";
import saleBanner from "../assets/products/sale-banner.png";

const PRODUCTS = [
  { id: 1, img: vans, name: "Vans Old Skool", price: "₱1,000.00", category: "shoes", gender: "men" },
  { id: 2, img: jordan, name: "Nike Jordans", price: "₱10,000.00", category: "shoes", gender: "men" },
  { id: 3, img: onitsuka, name: "Onitsuka Tokuten", price: "₱6,000.00", category: "shoes", gender: "women" },
  { id: 4, img: puma, name: "Puma Speedcat", price: "₱12,000.00", category: "shoes", gender: "women" },
  { id: 5, img: hoodie1, name: "Gray Hoodie", price: "₱1,500.00", category: "clothing", gender: "men" },
  { id: 6, img: pants, name: "Olive Green Pants", price: "₱5,500.00", category: "clothing", gender: "men" },
  { id: 7, img: hoodie2, name: "HelloKitty Hoodie", price: "₱1,000.00", category: "clothing", gender: "women" },
  { id: 8, img: shirt, name: "L A Oversize Tee", price: "₱700.00", category: "clothing", gender: "women" },
  // Additional products with same images (reusing for now)
  { id: 9, img: vans, name: "Vans Classic White", price: "₱1,200.00", category: "shoes", gender: "women" },
  { id: 10, img: jordan, name: "Air Jordan Retro", price: "₱11,000.00", category: "shoes", gender: "women" },
  { id: 11, img: onitsuka, name: "Onitsuka Mexico", price: "₱5,800.00", category: "shoes", gender: "men" },
  { id: 12, img: puma, name: "Puma RS-X", price: "₱8,500.00", category: "shoes", gender: "men" },
  { id: 13, img: hoodie1, name: "Black Hoodie Premium", price: "₱2,000.00", category: "clothing", gender: "women" },
  { id: 14, img: pants, name: "Black Cargo Pants", price: "₱6,000.00", category: "clothing", gender: "women" },
  { id: 15, img: hoodie2, name: "Anime Hoodie", price: "₱1,800.00", category: "clothing", gender: "men" },
  { id: 16, img: shirt, name: "Oversized Graphic Tee", price: "₱800.00", category: "clothing", gender: "men" },
  { id: 17, img: vans, name: "Vans Checkered", price: "₱1,100.00", category: "shoes", gender: "men" },
  { id: 18, img: jordan, name: "Jordan 1 Low", price: "₱9,500.00", category: "shoes", gender: "women" },
  { id: 19, img: onitsuka, name: "Onitsuka Slip-On", price: "₱5,500.00", category: "shoes", gender: "women" },
  { id: 20, img: puma, name: "Puma Suede Classic", price: "₱7,800.00", category: "shoes", gender: "men" },
];

const BRAND_CAROUSEL = [
  { id: 1, name: "Nike", discount: "Up to 60% Off" },
  { id: 2, name: "Adidas", discount: "Up to 75% Off" },
  { id: 3, name: "Puma", discount: "Up to 45% Off" },
  { id: 4, name: "Jordan", discount: "Up to 65% Off" },
  { id: 5, name: "Vans", discount: "Up to 50% Off" },
  { id: 6, name: "Converse", discount: "Up to 73% Off" },
];

const BANNER_SLIDES = [
  { 
    id: 1, 
    title: "NEW MEMBERS", 
    subtitle: "Enjoy 15% Off On Kent's Wardrobe. Use Code: Abadiakows12",
    backgroundImage: "linear-gradient(90deg, #333333 0%, #4a4a4a 25%, #FFD700 50%, #9400D3 75%, #FF1493 100%)",
    hasImage: true
  },
  { 
    id: 2, 
    title: "SALE", 
    subtitle: "New Members Enjoy 15% Off On Kent's Wardrobe. Hudar'sbabies14",
    backgroundImage: "linear-gradient(90deg, #FF69B4 0%, #FFB6C1 50%, #FF1493 100%)",
    hasImage: true
  },
  { 
    id: 3, 
    title: "SUMMER COLLECTION", 
    subtitle: "UP TO 50% OFF",
    backgroundImage: "linear-gradient(90deg, #FF6347 0%, #FFD700 50%, #00CED1 100%)",
    hasImage: true
  },
];

export default function Homepage() {
  const [cart, setCart] = useState([]);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  const [brandScrollPos, setBrandScrollPos] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const genderMatch = selectedGender === "all" || p.gender === selectedGender;
    const categoryMatch = selectedCategory === "all" || p.category === selectedCategory;
    return genderMatch && categoryMatch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const scrollBrandCarousel = (direction) => {
    const container = document.querySelector(".brand-carousel-container");
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToBannerSlide = (index) => {
    setCurrentBannerSlide(index);
  };

  return (
    <div className="homepage-container" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* NAVBAR */}
      <nav className="homepage-navbar">
        <div className="navbar-left">
          <img src={mascot} alt="KentWardrobe Logo" className="navbar-logo" />
          <h1 className="navbar-brand">KentWardrobe</h1>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>HOME</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>HISTORY</NavLink>
          <NavLink to="/profile" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>PROFILE</NavLink>
          <NavLink to="/cart" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            CART <span className="cart-badge">{cart.length}</span>
          </NavLink>
          <NavLink to="/login" className="nav-link logout-btn">LOGOUT</NavLink>
        </div>
      </nav>

      {/* BANNER CAROUSEL */}
      <div className="banner-carousel-wrapper">
        <div className="banner-carousel">
          {BANNER_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`banner-slide ${index === currentBannerSlide ? "active" : ""}`}
              style={{ backgroundImage: slide.backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="banner-content">
                <h2 className="banner-title">{slide.title}</h2>
                <p className="banner-subtitle">{slide.subtitle}</p>
                <button className="banner-shop-btn">Shop Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Indicators */}
        <div className="banner-indicators">
          {BANNER_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentBannerSlide ? "active" : ""}`}
              onClick={() => goToBannerSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* GENDER FILTER & SEARCH */}
      <div className="gender-section">
        <div className="gender-filters">
          <button 
            className={`gender-btn ${selectedGender === "women" ? "active" : ""}`}
            onClick={() => setSelectedGender("women")}
          >
            WOMEN
          </button>
          <button 
            className={`gender-btn ${selectedGender === "men" ? "active" : ""}`}
            onClick={() => setSelectedGender("men")}
          >
            MEN
          </button>
        </div>
        <div className="search-bar">
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-filters">
          <button 
            className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </button>
          <button 
            className={`category-btn ${selectedCategory === "shoes" ? "active" : ""}`}
            onClick={() => setSelectedCategory("shoes")}
          >
            Shoes
          </button>
          <button 
            className={`category-btn ${selectedCategory === "clothing" ? "active" : ""}`}
            onClick={() => setSelectedCategory("clothing")}
          >
            Clothing
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="products-section">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="product-image-container">
                <img
                  src={product.img}
                  alt={product.name}
                  className="product-image"
                />
                {hoveredProduct === product.id && (
                  <div className="product-overlay">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <p>&copy; 2025 KentWardrobe, Inc. All rights reserved</p>
          <p className="footer-tagline">Your Style, Your Story</p>
        </div>
      </footer>
    </div>
  );
}
