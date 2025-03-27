import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./StudentAttendance.css";

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const semesters = [
    { id: "wis2425", label: "Winter Semester 2024-25 - VLR" },
    { id: "wks2425", label: "Weekend Semester 2024-25 - VLR" },
  ];

  const student = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (selectedSemester && student?.login_id) {
      console.log("📢 Fetching courses for:", student.login_id, selectedSemester);
      fetch(`http://localhost:5000/api/student/${student.login_id}/courses?semester=${selectedSemester}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Course list:", data);
          setCourseList(data);
        })
        .catch((err) => {
          console.error("❌ Error fetching courses:", err);
        });
    }
  }, [selectedSemester, student?.login_id]);

  useEffect(() => {
    if (student?.login_id && selectedSemester && selectedCourse) {
      console.log("📢 Fetching attendance for:", selectedCourse);
      fetch(`http://localhost:5000/api/student/${student.login_id}/attendance/${selectedCourse}?semester=${selectedSemester}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Attendance data:", data);
          setAttendanceData(data);
        })
        .catch((err) => {
          console.error("❌ Error fetching attendance:", err);
        });
    }
  }, [selectedCourse, selectedSemester, student?.login_id]);

  const calculateStats = () => {
    const total = attendanceData.length;
    const attended = attendanceData.filter((a) => a.status === "present").length;
    const percentage = total ? Math.round((attended / total) * 100) : 0;
    return { attended, total, percentage };
  };

  const { attended, total, percentage } = calculateStats();

  return (
    <div className="attendance-container">
      <Sidebar />
      <div className="attendance-content">
        <h2 className="attendance-title">Student Attendance Details</h2>

        {/* Semester Dropdown */}
        <div className="semester-dropdown">
          <label>Semester:</label>
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setSelectedCourse("");
              setAttendanceData([]);
              setCourseList([]);
            }}
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.label}
              </option>
            ))}
          </select>
        </div>

        {/* Course Dropdown */}
        {selectedSemester && (
          <div className="course-dropdown">
            <label>Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Attendance Table */}
        {selectedCourse && attendanceData.length > 0 && (
          <div className="attendance-table-container">
            <h3>Attendance for {selectedSemester}</h3>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.date}</td>
                    <td
                      className={entry.status === "present" ? "present" : "absent"}
                    >
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="attendance-summary">
              <strong>Attended:</strong> {attended} / {total} |
              <strong> Attendance %:</strong> {percentage}%
            </p>
          </div>
        )}

        <button className="go-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default StudentAttendance;
