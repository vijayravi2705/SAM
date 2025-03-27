import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./FacultyDefaulters.css";

const FacultyDefaulters = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [defaulters, setDefaulters] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const faculty = JSON.parse(localStorage.getItem("userInfo"));

  const semesterMap = {
    "Winter Semester 2024-25 - VLR": "wis2425",
    "Weekend Semester 2024-25 - VLR": "wks2425"
  };

  const fetchCourses = async () => {
    if (faculty?.login_id && semester) {
      const res = await fetch(
        `http://localhost:5000/api/faculty/${faculty.login_id}/courses?semester=${semesterMap[semester]}`
      );
      const data = await res.json();
      setCourseList(data);
    }
  };

  useEffect(() => {
    setCourse("");
    setDefaulters([]);
    if (semester) fetchCourses();
  }, [semester]);

  const handleCourseChange = async (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
  
    if (!selectedCourse) return;
  
    try {
      const res = await fetch(
        `http://localhost:5000/api/faculty/${faculty.login_id}/defaulters?semester=${semesterMap[semester]}&course=${selectedCourse}`
      );
      const data = await res.json();
  
      // ✅ SAFETY CHECK — if data is not an array, don't crash
      if (!Array.isArray(data)) {
        setDefaulters([]);
        return;
      }
  
      const formatted = data.map((d) => ({
        ...d,
        lastThree: d.recent_attendance?.map(
          (a) => `${a.date.split('T')[0]} ${a.status.toUpperCase().charAt(0)}`
        ) || [],
        reg_no: d.student_id,
        shortfall: Math.ceil((75 - d.attendance_percent) * d.total_classes / 100),
      }));
  
      setDefaulters(formatted);
    } catch (error) {
      console.error("Error fetching defaulters:", error);
      setDefaulters([]);
    }
  };
  
  const downloadCSV = () => {
    let csv = "Sl.No,Name,Reg No,Attendance %,Shortfall Classes,Last 3 Records\n";
    defaulters.forEach((d, i) => {
      csv += `${i + 1},${d.name},${d.reg_no},${d.attendance_percent}%,${d.shortfall},"${d.lastThree.join(", ")}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `defaulters-${semesterMap[semester]}-${course}.csv`;
    a.click();
  };

  return (
    <div className="faculty-defaulters-container">
      <Sidebar />
      <div className="defaulters-content">
        <h2 className="dashboard-title">Defaulters List</h2>
        <p className="dashboard-subtitle">
          View students with attendance below 75%
        </p>

        <div className="filter-controls">
          <div className="dropdown-group">
            <label>Semester</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">-- Select Semester --</option>
              <option value="Winter Semester 2024-25 - VLR">Winter Semester 2024-25 - VLR</option>
              <option value="Weekend Semester 2024-25 - VLR">Weekend Semester 2024-25 - VLR</option>
            </select>
          </div>

          {semester && (
            <div className="dropdown-group">
              <label>Course</label>
              <select value={course} onChange={handleCourseChange}>
                <option value="">-- Select Course --</option>
                {courseList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {defaulters.length > 0 && (
          <div className="defaulters-table">
            <table>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Attendance %</th>
                  <th>Shortfall Classes</th>
                  <th>Last 3 Records</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((student, index) => (
                  <tr key={student.student_id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.reg_no}</td>
                    <td className="low-attendance">{student.attendance_percent}%</td>
                    <td>{student.shortfall}</td>
                    <td>
                      {student.lastThree.map((entry, i) => (
                        <div key={i}>{entry}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadCSV} className="submit-btn">
              Download as CSV
            </button>
          </div>
        )}

        <button className="go-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FacultyDefaulters;
