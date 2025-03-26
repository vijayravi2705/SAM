import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./FacultyDefaulters.css";

const FacultyDefaulters = () => {
    const navigate = useNavigate();
    const [semester, setSemester] = useState("");
    const [course, setCourse] = useState("");
    const [defaulters, setDefaulters] = useState([]);
    const [lastThreeDates, setLastThreeDates] = useState([]);

    // Function to fetch last 3 classes dynamically
    const generateLastThreeDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 1; i <= 3; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - (i * 2)); // Assuming alternate classes
            dates.push(pastDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
        }
        return dates;
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
        setCourse("");
        setDefaulters([]);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
        fetchDefaulters(e.target.value);
    };

    const fetchDefaulters = (course) => {
        setLastThreeDates(generateLastThreeDates());

        // Mock Defaulters Data with Last 3 Classes Attendance
        const mockDefaulters = [
            { id: 1, name: "John Doe", regNo: "22BIT0687", attendance: "60%", shortfall: "10 classes", lastThree: ["P", "A", "P"] },
            { id: 2, name: "Jane Smith", regNo: "22BIT0345", attendance: "58%", shortfall: "12 classes", lastThree: ["A", "A", "P"] },
            { id: 3, name: "Michael Brown", regNo: "22BIT0789", attendance: "62%", shortfall: "8 classes", lastThree: ["P", "P", "P"] },
            { id: 4, name: "Emily Davis", regNo: "22BIT0234", attendance: "55%", shortfall: "15 classes", lastThree: ["A", "A", "A"] },
        ];
        setDefaulters(mockDefaulters);
    };

    return (
        <div className="faculty-defaulters-container">
            <Sidebar />
            <div className="defaulters-content">
                <h2 className="dashboard-title">Defaulters List</h2>
                <p className="dashboard-subtitle">View students with attendance below 75%</p>

                {/* Dropdowns */}
                <div className="filter-controls">
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
                </div>

                {/* Defaulters Table */}
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
                                    {lastThreeDates.map((date, index) => (
                                        <th key={index}>{date}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {defaulters.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.regNo}</td>
                                        <td className="low-attendance">{student.attendance}</td>
                                        <td>{student.shortfall}</td>
                                        {student.lastThree.map((status, i) => (
                                            <td key={i}>
                                                <span className={`attendance-${status}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Go Back Button */}
                <button className="go-back-btn" onClick={() => navigate(-1)}>
                     Go Back
                </button>
            </div>
        </div>
    );
};

export default FacultyDefaulters;
