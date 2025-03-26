import React, { useState, useEffect } from "react";
import "./AdminSettings.css";
import Sidebar from "../components/Sidebar";

const AdminSettings = () => {


  return (
    <div className="admin-settings-container">
      <Sidebar />
      <div className="admin-settings-content">
        <h2 className="settings-title">System Settings</h2>

    

        {/* Change Password Section */}
        <div className="settings-section">
          <label>Change Password:</label>
          <input type="password" placeholder="New Password" />
        </div>

        {/* Notification Preferences */}
        <div className="settings-section">
          <label>Notification Preferences:</label>
          <select>
            <option>Email Only</option>
            <option>SMS + Email</option>
            <option>None</option>
          </select>
        </div>

        <button className="save-settings-btn">Save Settings</button>
      </div>
    </div>
  );
};

export default AdminSettings;
