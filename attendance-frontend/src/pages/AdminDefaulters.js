import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./AdminDefaulters.css";

const mockFacultyCourses = {
  "Dr. Smith": ["Machine Learning", "Cloud Computing"],
  "Dr. Jones": ["Data Mining"],
};

const mockDefaulters = {
  "Dr. Smith": {
    "Machine Learning": [
      { name: "John Doe", regNo: "22BIT001", percentage: 62, lastClasses: ["P", "A", "P"] },
      { name: "Jane Smith", regNo: "22BIT002", percentage: 58, lastClasses: ["A", "A", "P"] },
    ],
    "Cloud Computing": [
      { name: "Sarah Lee", regNo: "22BIT003", percentage: 67, lastClasses: ["P", "P", "P"] }
    ],
  },
  "Dr. Jones": {
    "Data Mining": [
      { name: "David Kim", regNo: "22BIT004", percentage: 60, lastClasses: ["A", "A", "A"] }
    ],
  },
};

const AdminDefaulters = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleDownloadCSV = () => {
    if (!selectedFaculty || !selectedCourse) return;
    const data = mockDefaulters[selectedFaculty][selectedCourse];
    const csvContent =
      "Name,RegNo,Percentage,Last Class 1,Last Class 2,Last Class 3\n" +
      data.map(d =>
        `${d.name},${d.regNo},${d.percentage},${d.lastClasses.join(",")}`
      ).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "defaulters_list.csv";
    link.click();
  };

  const filteredCourses = selectedFaculty ? mockFacultyCourses[selectedFaculty] : [];

  const defaulters = selectedFaculty && selectedCourse
    ? mockDefaulters[selectedFaculty][selectedCourse] || []
    : [];

  return (
    <div className="admin-defaulters-container">
      <Sidebar />
      <div className="defaulters-content">
        <h2>Defaulters List</h2>

        <div className="dropdowns">
          <select value={selectedFaculty} onChange={(e) => {
            setSelectedFaculty(e.target.value);
            setSelectedCourse("");
          }}>
            <option value="">-- Select Faculty --</option>
            {Object.keys(mockFacultyCourses).map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>

          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} disabled={!selectedFaculty}>
            <option value="">-- Select Course --</option>
            {filteredCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {defaulters.length > 0 && (
          <>
            <table className="defaulters-table">
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Attendance %</th>
                  <th colSpan={3}>Last 3 Classes</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((student, index) => (
                  <tr key={student.regNo}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.regNo}</td>
                    <td>{student.percentage}%</td>
                    {student.lastClasses.map((cls, idx) => (
                      <td key={idx}>
                        <span className={`status ${cls === "P" ? "present" : "absent"}`}>{cls}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="download-btn" onClick={handleDownloadCSV}>
              📥 Download CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDefaulters;
