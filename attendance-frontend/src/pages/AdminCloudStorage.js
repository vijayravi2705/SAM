import React from "react";
import "./AdminCloudStorage.css";
import Sidebar from "../components/Sidebar";

const AdminCloudStorage = () => {
  return (
    <div className="admin-storage-container">
      <Sidebar />
      <div className="admin-storage-content">
        <h2 className="storage-title">Cloud Storage</h2>
        <div className="storage-metrics">
          <div className="storage-box used">
            <h3>Used</h3>
            <p>780 GB</p>
          </div>
          <div className="storage-box free">
            <h3>Available</h3>
            <p>220 GB</p>
          </div>
        </div>

        <div className="storage-health">
          <h3>Cloud Health</h3>
          <p>Status: <span className="healthy">Healthy</span></p>
        </div>

        <div className="manage-buttons">
          <button className="manage-btn">Manage Storage</button>
          <button className="clear-btn">Clear Old Data</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCloudStorage;
