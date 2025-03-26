import React from "react";
import Sidebar from "../components/Sidebar";
import "./AdminDashboard.css";
import Footer from "../components/Footer"; // Ensure Footer is included
import { FaUsers, FaChalkboardTeacher, FaClipboardList, FaChartBar, FaUniversity, FaUserShield, FaDatabase } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


const AdminDashboard = () => {
    // Sample data for charts
    const attendanceData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Attendance %",
                data: [75, 80, 78, 82, 85, 90],
                backgroundColor: "#235993",
                borderColor: "#1c4a7d",
                borderWidth: 2,
            },
        ],
    };

    const defaulterData = {
        labels: ["BIT401L", "BIT402L", "BIT403L", "BIT404L"],
        datasets: [
            {
                label: "Defaulters",
                data: [20, 30, 25, 40],
                backgroundColor: ["#FF5733", "#FFC300", "#36A2EB", "#4CAF50"],
            },
        ],
    };

    return (
        <div className="admin-dashboard-container">
            <Sidebar />

            <div className="admin-dashboard-content">
                <h2 className="admin-dashboard-title">Admin Dashboard</h2>
                <p className="admin-dashboard-subtitle">Overview of attendance, faculty, and system analytics</p>

                {/* -------------- Dashboard Tiles -------------- */}
                <div className="admin-dashboard-grid">
                    <div className="admin-dashboard-card">
                        <FaUsers className="admin-dashboard-icon" />
                        <h3>Total Students</h3>
                        <p>1,250</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaChalkboardTeacher className="admin-dashboard-icon" />
                        <h3>Total Faculty</h3>
                        <p>78</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaClipboardList className="admin-dashboard-icon" />
                        <h3>Defaulters</h3>
                        <p>120 Students</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaChartBar className="admin-dashboard-icon" />
                        <h3>Attendance Overview</h3>
                        <p>Overall: 82%</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaUniversity className="admin-dashboard-icon" />
                        <h3>Departments</h3>
                        <p>5 Departments</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaUserShield className="admin-dashboard-icon" />
                        <h3>Active Users</h3>
                        <p>845 Users</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaDatabase className="admin-dashboard-icon" />
                        <h3>Database Usage</h3>
                        <p>78% Used</p>
                    </div>

                    <div className="admin-dashboard-card">
                        <FaClipboardList className="admin-dashboard-icon" />
                        <h3>System Logs</h3>
                        <p>Last Updated: 2 Hours Ago</p>
                    </div>

                
                </div>

                {/* -------------- Graphs Section -------------- */}    
                <div className="charts-container">
                    <div className="chart-box">
                        <Line data={attendanceData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className="chart-box">
                        <Pie data={defaulterData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
