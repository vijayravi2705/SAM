import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Importing CSS for login styling

const LoginPage = () => {
  const { role } = useParams(); // Get user role from URL
  const navigate = useNavigate();

  // Handle Login Function
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page reload

   // Store user role in local storage
   localStorage.setItem("userRole", role);
    
   // Navigate to respective dashboard
   navigate(`/${role}-dashboard`);
  };

  return (
    <div className="login-page-wrapper">
      {/* HEADER */}
      <div className="header-container">
        <img src="/th.jpg" alt="VIT Logo" className="logo" />
        <h1 className="site-title">Smart Attendance Management</h1>
      </div>

      {/* MAIN LOGIN SECTION */}
      <div className="login-page-container">
        <div className="login-box">
          <h2 className="login-title">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input type="text" placeholder="Username" required />
              <span className="icon">👤</span>
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" required />
              <span className="icon">🔒</span>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="extra-links">
            <Link to="#">Forgot Password</Link> | 
            <Link to="#"> Forgot LoginId</Link>
          </div>

          <Link to="/" className="home-link">Go to Home Page</Link>
        </div>
      </div>

      {/* ABOUT US & CREATORS SECTION */}
      <div className="footer-container">
        <div className="about-container">
          <h2>About Us</h2>
          <p>Secure and real-time attendance management system for educational institutions.</p>
          <p>Contact Support: <strong>support@attendance.com</strong></p>
        </div>

        <div className="creators">
          <div className="creator-card">
            <h3>John Doe</h3>
            <p>Frontend Developer</p>
            <a href="mailto:johndoe@example.com">johndoe@example.com</a>
          </div>
          <div className="creator-card">
            <h3>Jane Smith</h3>
            <p>Backend Developer</p>
            <a href="mailto:janesmith@example.com">jansmith@example.com</a>
          </div>
          <div className="creator-card">
            <h3>David Brown</h3>
            <p>Cloud & AI Specialist</p>
            <a href="mailto:david@example.com">david@example.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
