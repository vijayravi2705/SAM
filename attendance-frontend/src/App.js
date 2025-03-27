import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAttendance from "./pages/StudentAttendance";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyAttendance from "./pages/FacultyAttendance";
import FacultyDefaulters from "./pages/FacultyDefaulters";
import AdminDashboard from "./pages/AdminDashboard";
import ManageFaculty from './pages/ManageFaculty';
import AdminMarkAttendance from "./pages/AdminMarkAttendance";
import AdminDefaulters from "./pages/AdminDefaulters";


// Header Component
const Header = () => {
  return (
    <div className="header-container">
      <img src="/th.jpg" alt="VIT Logo" className="logo" />
      <h1 className="site-title">Smart Attendance Management</h1>
    </div>
  );
};

// Home Page Component
const Home = ({ setLoginTransition }) => {
  const navigate = useNavigate();

  // Handles Login Click & Triggers Animation
  const handleLoginClick = (role) => {
    setLoginTransition(true);
    setTimeout(() => navigate(`/login/${role}`), 800);
  };

  return (
    <div className="main-container">
      {/* Middle Section */}
      <div className="middle-container">
        <div className="login-section">
          <div className="login-card" onClick={() => handleLoginClick("student")}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Student" className="login-icon" />
            <p>Student</p>
          </div>

          <div className="login-card" onClick={() => handleLoginClick("faculty")}>
            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="Faculty" className="login-icon" />
            <p>Faculty</p>
          </div>

          <div className="login-card" onClick={() => handleLoginClick("admin")}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Administrator" className="login-icon" />
            <p>Administrator</p>
          </div>
        </div>

        {/* Spotlight & Rules Section */}
        <div className="info-section">
          <div className="spotlight-container">
            <h3>Spotlight</h3>
            <p>⚡ <a href="#">External Participation Form</a></p>
            <p>⚡ <a href="#">Student Council 2024-25</a></p>
            <p>⚡ <a href="#">Library Guidelines</a></p>
            <p>⚡ <a href="#">Day Boarder/Day Scholar Form</a></p>
            <p>⚡ <a href="#">Hostel Admission Request Form</a></p>
          </div>

          <div className="rules-container">
            <h3>Rules & Information</h3>
            <p>✅ Faculty must update attendance daily before the session ends.</p>
            <p>✅ Students can check their attendance online anytime.</p>
            <p>✅ Administrators have full control over attendance management.</p>
            <p>✅ Contact support if any issues arise.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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

// Main App Component
export default function App() {
  const [loginTransition, setLoginTransition] = useState(false);

  return (
    <Router>
      <div className={`app-wrapper ${loginTransition ? "login-transition" : ""}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home setLoginTransition={setLoginTransition} />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout><h2>Welcome to the Dashboard</h2></DashboardLayout>} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty-attendance" element={<FacultyAttendance />} />
          <Route path="/faculty-defaulters" element={<FacultyDefaulters />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-manage-faculty" element={<ManageFaculty />} />
          <Route path="/admin-mark-attendance" element={<AdminMarkAttendance />} />
          <Route path="/admin-defaulters" element={<AdminDefaulters />} />




        </Routes>
      </div>
    </Router>
  );
}




