import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";  // Ensure Sidebar is included
import Footer from "../components/Footer";
import "./Dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-body">
        <Sidebar /> {/* Ensure Sidebar is included here */}
        <main className="main-content">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
