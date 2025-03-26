import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Faculty-Attendance.css";

const FacultyAttendance = () => {
    const navigate = useNavigate();
    const [semester, setSemester] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [students, setStudents] = useState([]);

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
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

        // Mock Student Data
        setStudents([
            { id: 1, name: "John Doe", regNo: "22BIT0687", status: "P" },
            { id: 2, name: "Jane Smith", regNo: "22BIT0345", status: "A" },
            { id: 3, name: "Michael Brown", regNo: "22BIT0789", status: "P" },
            { id: 4, name: "Emily Davis", regNo: "22BIT0234", status: "A" },
            { id: 5, name: "David Wilson", regNo: "22BIT0567", status: "P" },
            { id: 6, name: "Sarah Johnson", regNo: "22BIT0456", status: "A" },
        ]);
    };

    const toggleAttendance = (index) => {
        setStudents((prevStudents) =>
            prevStudents.map((student, i) =>
                i === index ? { ...student, status: student.status === "P" ? "A" : "P" } : student
            )
        );
    };

    return (
        <div className="faculty-attendance-container">
            <Sidebar />

            <div className="attendance-content">
                <h2 className="dashboard-title">Faculty Attendance</h2>
                <p className="dashboard-subtitle">Mark attendance for your students</p>

                {/* Dropdown Section */}
                <div className="attendance-controls">
                    <div className="dropdown-group">
                        <label>Semester</label>
                        <select value={semester} onChange={handleSemesterChange}>
                            <option value="">-- Select Semester --</option>
                            <option value="Winter 2025">Winter 2025</option>
                            <option value="Weekend 2025">Weekend 2025</option>
                            <option value="Summer 2025">Summer 2025</option>
                        </select>
                    </div>

                    {semester && (
                        <div className="dropdown-group">
                            <label>Course</label>
                            <select value={course} onChange={handleCourseChange}>
                                <option value="">-- Select Course --</option>
                                <option value="BIT401L - Machine Learning">Machine Learning</option>
                                <option value="BIT412L - Cloud Computing">Cloud Computing</option>
                                <option value="BIT410L - Data Mining">Data Mining</option>
                            </select>
                        </div>
                    )}

                    {course && (
                        <div className="dropdown-group">
                            <label>Date</label>
                            <input type="date" value={date} onChange={handleDateChange} />
                        </div>
                    )}
                </div>

                {/* Attendance Table */}
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
                                {students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.regNo}</td>
                                        <td>{date}</td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={student.status === "P"}
                                                    onChange={() => toggleAttendance(index)}
                                                />
                                                <span className={`slider ${student.status === "P" ? "present" : "absent"}`}>
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

                {/* Action Buttons */}
                {students.length > 0 && (
                    <div className="action-buttons">
                        <button className="go-back-btn" onClick={() => navigate(-1)}>
                             Go Back
                        </button>
                        <button className="submit-btn">Submit Attendance</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacultyAttendance;
