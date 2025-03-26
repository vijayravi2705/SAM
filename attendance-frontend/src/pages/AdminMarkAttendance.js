import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./AdminMarkAttendance.css";

const AdminMarkAttendance = () => {
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [students, setStudents] = useState([]);

    const handleFacultyChange = (e) => {
        setFaculty(e.target.value);
        setCourse("");
        setDate("");
        setStudents([]);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
        setDate("");
        setStudents([]);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        // Mock student list
        setStudents([
            { id: 1, name: "John Doe", regNo: "22BIT1234", status: "P" },
            { id: 2, name: "Jane Smith", regNo: "22BIT5678", status: "A" },
        ]);
    };

    const toggleAttendance = (index) => {
        const updated = [...students];
        updated[index].status = updated[index].status === "P" ? "A" : "P";
        setStudents(updated);
    };

    return (
        <div className="admin-attendance-container">
            <Sidebar />
            <div className="attendance-content">
                <h2 className="dashboard-title">Mark Attendance (Admin)</h2>
                <p className="dashboard-subtitle">Select Faculty & Course to mark attendance</p>

                <div className="attendance-controls">
                    <div>
                        <label>Faculty</label>
                        <select value={faculty} onChange={handleFacultyChange}>
                            <option value="">-- Select Faculty --</option>
                            <option value="Subhashini">Subhashini</option>
                            <option value="Ramkumar">Ramkumar</option>
                            <option value="Pounambal">Pounambal</option>
                        </select>
                    </div>

                    {faculty && (
                        <div>
                            <label>Course</label>
                            <select value={course} onChange={handleCourseChange}>
                                <option value="">-- Select Course --</option>
                                <option value="BIT401L">Machine Learning</option>
                                <option value="BIT412L">Cloud Computing</option>
                            </select>
                        </div>
                    )}

                    {course && (
                        <div>
                            <label>Date</label>
                            <input type="date" value={date} onChange={handleDateChange} />
                        </div>
                    )}
                </div>

                {students.length > 0 && (
                    <div className="attendance-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Reg No</th>
                                    <th>Date</th>
                                    <th>Mark Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, i) => (
                                    <tr key={s.id}>
                                        <td>{i + 1}</td>
                                        <td>{s.name}</td>
                                        <td>{s.regNo}</td>
                                        <td>{date}</td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={s.status === "P"}
                                                    onChange={() => toggleAttendance(i)}
                                                />
                                                <span className={`slider ${s.status === "P" ? "present" : "absent"}`}>
                                                    <span className="circle"></span>
                                                </span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {students.length > 0 && (
                    <div className="action-buttons">
                        <button className="go-back-btn" onClick={() => navigate(-1)}>⬅ Go Back</button>
                        <button className="submit-btn">Submit Attendance</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMarkAttendance;
