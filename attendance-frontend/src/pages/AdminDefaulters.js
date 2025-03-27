import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./AdminDefaulters.css";

const AdminDefaulters = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [defaulters, setDefaulters] = useState([]);

  const semesterMap = {
    "Winter Semester 2024-25 - VLR": 1,
    "Weekend Semester 2024-25 - WKD": 2
  };

  useEffect(() => {
    const fetchDefaulters = async () => {
      if (selectedSemester) {
        const semester_id = semesterMap[selectedSemester];

        try {
          const res = await fetch("http://localhost:5000/api/admin/defaulters/semester", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ semester_id })
          });

          const data = await res.json();
          setDefaulters(data);
        } catch (err) {
          console.error("Error fetching defaulters", err);
        }
      }
    };

    fetchDefaulters();
  }, [selectedSemester]);

  const handleDownloadCSV = () => {
    if (!defaulters.length) return;

    const csvContent =
      "Name,RegNo,Percentage,Last Class 1,Last Class 2,Last Class 3\n" +
      defaulters
        .map(
          (d) =>
            `${d.name},${d.reg_no},${d.attendance_percentage},${d.last_3[0] || ""},${d.last_3[1] || ""},${d.last_3[2] || ""}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "defaulters_list.csv";
    link.click();
  };

  return (
    <div className="admin-defaulters-container">
      <Sidebar />
      <div className="defaulters-content">
        <h2>Defaulters List</h2>

        <div className="dropdowns">
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setDefaulters([]);
            }}
          >
            <option value="">-- Select Semester --</option>
            {Object.keys(semesterMap).map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
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
                  <tr key={student.reg_no}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.reg_no}</td>
                    <td>{student.attendance_percentage}%</td>
                    {Array.isArray(student.last_3)
                      ? student.last_3.map((cls, idx) => (
                          <td key={idx}>
                            <span className={`status ${cls === "P" ? "present" : "absent"}`}>{cls}</span>
                          </td>
                        ))
                      : [<td key="n1">-</td>, <td key="n2">-</td>, <td key="n3">-</td>]}
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
