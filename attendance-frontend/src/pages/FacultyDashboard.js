import React from "react";
import Sidebar from "../components/Sidebar"; // Ensure Sidebar is included
import Footer from "../components/Footer"; // Ensure Footer is included
import "./FacultyDashboard.css";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  return (
    <div className="faculty-dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="faculty-dashboard">
        <h2 className="faculty-dashboard-title">Welcome to the Faculty Dashboard!</h2>
        <p className="faculty-dashboard-subtitle">
          Manage attendance, track student performance, and stay updated.
        </p>

        {/* Dashboard Tiles */}
        <div className="faculty-dashboard-grid">
          <div className="faculty-dashboard-card">
            <h3>📢 Announcements</h3>
            <p>Latest updates on attendance policies, exams, and events.</p>
            <Link to="/faculty-announcements" className="btn">View Announcements</Link>
          </div>

          <div className="faculty-dashboard-card">
            <h3>✅ Mark Attendance</h3>
            <p>Quickly mark attendance for your assigned classes.</p>
            <Link to="/mark-attendance" className="btn">Go to Mark Attendance</Link>
          </div>

          <div className="faculty-dashboard-card">
            <h3>📊 Attendance Overview</h3>
            <p>Track student attendance percentage and trends.</p>
            <Link to="/faculty-attendance-overview" className="btn">View Overview</Link>
          </div>

          <div className="faculty-dashboard-card">
            <h3>🔍 Defaulters List</h3>
            <p>See students with attendance below 75%.</p>
            <Link to="/defaulters-list" className="btn">View Defaulters</Link>
          </div>

          <div className="faculty-dashboard-card">
            <h3>🗂 Attendance Records</h3>
            <p>View and modify past attendance records.</p>
            <Link to="/faculty-attendance-records" className="btn">View Records</Link>
          </div>

          <div className="faculty-dashboard-card">
            <h3>📅 Upcoming Schedule</h3>
            <p>See your upcoming classes, deadlines, and exams.</p>
            <Link to="/faculty-schedule" className="btn">View Schedule</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FacultyDashboard;
