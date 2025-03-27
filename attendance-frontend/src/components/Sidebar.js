import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaClipboardList,
    FaUsers,
    FaCloud,
    FaCog,
    FaListAlt,
    FaSignOutAlt
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../pages/th.jpg"; // Logo path

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            {/* Toggle Button */}
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FaBars />
            </button>

            {/* Sidebar Container */}
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

                {/* Sidebar Header with Logo and Short Text */}
                <div className="sidebar-header">
                    <img src={logo} alt="SAM Logo" className="sidebar-logo" />
                    <span className={`sidebar-title ${isOpen ? "show" : "hide"}`}>SAM</span>
                </div>

                <ul className="nav-list">

                    {/* STUDENT MENU */}
                    {userRole === "student" && (
                        <>
                            <li data-tooltip="Dashboard">
                                <Link to="/student-dashboard" className="sidebar-link">
                                    <FaUserGraduate className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Dashboard</span>
                                </Link>
                            </li>
                            <li data-tooltip="My Attendance">
                                <Link to="/student-attendance" className="sidebar-link">
                                    <FaChalkboardTeacher className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>My Attendance</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {/* FACULTY MENU */}
                    {userRole === "faculty" && (
                        <>
                            <li data-tooltip="Dashboard">
                                <Link to="/faculty-dashboard" className="sidebar-link">
                                    <FaChalkboardTeacher className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Dashboard</span>
                                </Link>
                            </li>
                            <li data-tooltip="Mark Attendance">
                                <Link to="/faculty-attendance" className="sidebar-link">
                                    <FaUserGraduate className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Mark Attendance</span>
                                </Link>
                            </li>
                            <li data-tooltip="Defaulters List">
                                <Link to="/faculty-defaulters" className="sidebar-link">
                                    <FaListAlt className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Defaulters List</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {/* ADMIN MENU */}
                    {userRole === "admin" && (
                        <>
                            <li data-tooltip="Dashboard">
                                <Link to="/admin-dashboard">
                                    <FaUsers className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Dashboard</span>
                                </Link>
                            </li>
                            <li data-tooltip="Manage Faculty">
                                <Link to="/admin-manage-faculty">
                                    <FaChalkboardTeacher className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Manage Faculty</span>
                                </Link>
                            </li>
                            <li data-tooltip="Mark Attendance">
                                <Link to="/admin-mark-attendance" className="sidebar-link">
                                    <FaUserGraduate className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Mark Attendance</span>
                                </Link>
                                </li>
                            <li data-tooltip="Defaulters List">
                                <Link to="/admin-defaulters"className="sidebar-link">
                                    <FaClipboardList className="sidebar-icon" />
                                    <span className={isOpen ? "show" : "hide"}>Defaulters</span>
                                </Link>
                            </li>

                        </>
                    )}

                    {/* LOGOUT BUTTON (Visible for All Users) */}
                    <li data-tooltip="Logout" onClick={handleLogout} className="logout">
                        <FaSignOutAlt className="sidebar-icon" />
                        <span className={isOpen ? "show" : "hide"}>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
