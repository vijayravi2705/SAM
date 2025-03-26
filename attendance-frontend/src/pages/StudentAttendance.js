import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Ensure Sidebar is imported
import "./StudentAttendance.css"; // Ensure CSS file is correctly linked

const StudentAttendance = () => {
  const [selectedSemester, setSelectedSemester] = useState(""); // Track selected semester
  const navigate = useNavigate(); // Navigation hook for "Go Back"

  // List of semesters
  const semesters = [
    "Winter Semester 2024-25 - VLR",
    "Fall Semester 2024-25 - VLR",
    "Winter Semester 2023-24 - VLR",
    "Fall Semester 2023-24 - VLR",
    "Winter Semester 2022-23 - VLR",
    "Fall Semester 2022-23 - VLR",
  ];

  return (
    <div className="attendance-container">
      {/* Sidebar (Ensure it remains functional) */}
      <Sidebar />

      <div className="attendance-content">
        <h2 className="attendance-title">Student Attendance Details</h2>

        {/* Dropdown for selecting semester */}
        <div className="semester-dropdown">
          <label className="sem">Semester: </label>
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">-- Choose Semester --</option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        {/* Attendance table appears only after selecting a semester */}
        {selectedSemester && (
          <div className="attendance-table-container">
            <h3>Attendance for {selectedSemester}</h3>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Class Group</th>
                  <th>Course Detail</th>
                  <th>Faculty</th>
                  <th>Attended</th>
                  <th>Total Classes</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>General (Semester)</td>
                  <td>BITE312E - Data Mining</td>
                  <td>Prof. Subhashini</td>
                  <td>9</td>
                  <td>16</td>
                  <td className="low-attendance">57%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>General (Semester)</td>
                  <td>BIT401L - Machine Learning</td>
                  <td>Prof. Ramkumar</td>
                  <td>14</td>
                  <td>29</td>
                  <td className="high-attendance">70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* "Go Back" Button - Ensuring it works */}
        <button className="go-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentAttendance;
