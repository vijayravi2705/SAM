import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    // Fetch user profile details
    const userProfile = localStorage.getItem("userProfileImage") || "/default-profile.png"; // Default profile image

    return (
        <header className="header">
            <div className="header-left">
                <img src="/th.jpg" alt="VIT Logo" className="logo" />
                <h1 className="site-title">Smart Attendance Management</h1>
            </div>
            <div className="header-right">
                <img src={userProfile} alt="Profile" className="profile-img" />
            </div>
        </header>
    );
};

export default Header;
