import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) return alert("Please enter all fields.");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_id: username,
          password,
          role
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("userRole", role);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(`/${role}-dashboard`);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Login failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="header-container">
        <img src="/th.jpg" alt="VIT Logo" className="logo" />
        <h1 className="site-title">Smart Attendance Management</h1>
      </div>

      <div className="login-page-container">
        <div className="login-box">
          <h2 className="login-title">{role.toUpperCase()} Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon">👤</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon">🔒</span>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="extra-links">
            <Link to="#">Forgot Password</Link> | <Link to="#">Forgot Login ID</Link>
          </div>
          <Link to="/" className="home-link">Go to Home Page</Link>
        </div>
      </div>

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
            <a href="mailto:janesmith@example.com">janesmith@example.com</a>
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
