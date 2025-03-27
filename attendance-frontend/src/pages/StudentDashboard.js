import React, { useEffect, useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return;

    fetch(`http://localhost:5000/api/student/${user.login_id}/attendance-summary`)
    .then((res) => res.json())
      .then((data) => setAttendance(data))
      .catch((err) => console.error("Error fetching attendance:", err));
  }, []);

  return (
    <DashboardLayout>
      <div className="student-dashboard-content">
        <h1 className="student-dashboard-title">Welcome to the Student Dashboard!</h1>
        <p className="student-dashboard-subtitle">Access your attendance, courses, feedback, and more.</p>

        <div className="student-dashboard-grid">
          {/* Static Cards */}
          <div className="student-dashboard-card">
            <h2>📢 Announcements</h2>
            <p>🔹 Mid-Semester Feedback Open until March 14, 2025</p>
            <p>🔹 Course Registration for Fall 2025 starts on April 1st</p>
            <a href="#" className="student-dashboard-link">View All Announcements →</a>
          </div>

          <div className="student-dashboard-card">
            <h2>📝 Feedback Form</h2>
            <p>Submit feedback on courses, faculty, and campus facilities.</p>
            <a href="#" className="quick-action">Give Feedback</a>
          </div>

          <div className="student-dashboard-card">
            <h2>📜 Institutional Guidelines</h2>
            <p>Read the latest rules and policies applicable for students.</p>
            <a href="#" className="quick-action">View Guidelines</a>
          </div>

          <div className="student-dashboard-card">
            <h2>🎉 Upcoming Events</h2>
            <p>🔹 Tech Fest: April 15, 2025</p>
            <p>🔹 Hackathon Registration Closes on April 10, 2025</p>
            <a href="#" className="dashboard-link">See All Events →</a>
          </div>

          <div className="student-dashboard-card">
            <h2>🔗 Quick Links</h2>
            <ul>
              <li><a href="#">Library Resources</a></li>
              <li><a href="#">Academic Calendar</a></li>
              <li><a href="#">Hostel & Transport Services</a></li>
              <li><a href="#">IT Help Desk</a></li>
            </ul>
          </div>

          <div className="student-dashboard-card">
            <h2>📊 Attendance Overview</h2>
            <p>Your overall attendance for the semester:</p>
            {attendance ? (
              <p className={attendance.overall_attendance < 75 ? "low-attendance" : "high-attendance"}>
                {attendance.overall_attendance}% {attendance.overall_attendance < 75 ? "- Needs Improvement!" : "- Good Standing"}
              </p>
            ) : (
              <p>Loading attendance...</p>
            )}
            <a href="/student-attendance" className="quick-action">View Attendance Details</a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
