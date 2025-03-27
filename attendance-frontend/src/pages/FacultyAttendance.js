import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Faculty-Attendance.css";

const FacultyAttendance = () => {
    const navigate = useNavigate();
    const faculty = JSON.parse(localStorage.getItem("userInfo"));
    const [semester, setSemester] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);

    // 🧠 Map dropdown label to backend code
    const semesterMap = {
        "Winter Semester 2024-25 - VLR": "wis2425",
        "Weekend Semster 2024-25 - VLR": "wks2425"
    };

    // Fetch courses taught by faculty
    useEffect(() => {
        const semesterCode = semesterMap[semester];
        if (faculty?.login_id && semesterCode) {
            fetch(`http://localhost:5000/api/faculty/${faculty.login_id}/courses?semester=${semesterCode}`)
                .then(res => res.json())
                .then(data => setCourses(data))
                .catch(err => console.error("Error fetching faculty courses:", err));
        }
    }, [faculty?.login_id, semester]);

    // Fetch students enrolled in that course
    useEffect(() => {
        const semesterCode = semesterMap[semester];
        if (course && semesterCode) {
            fetch(`http://localhost:5000/api/faculty/${faculty.login_id}/students?course=${course}&semester=${semesterCode}`)
                .then(res => res.json())
                .then(data => setStudents(data.map(s => ({ ...s, status: "P" }))))
                .catch(err => console.error("Error fetching students:", err));
        }
    }, [course, semester, faculty?.login_id]);

    const toggleAttendance = (index) => {
        setStudents((prev) =>
            prev.map((s, i) =>
                i === index ? { ...s, status: s.status === "P" ? "A" : "P" } : s
            )
        );
    };

    const handleSubmit = () => {
        const semesterCode = semesterMap[semester];
        if (!semesterCode || !date || !course || students.length === 0) {
            alert("Fill all fields before submitting.");
            return;
        }

        const formattedStudents = students.map(s => ({
            student_id: s.student_id,
            status: s.status
        }));

        fetch(`http://localhost:5000/api/faculty/${faculty.login_id}/mark-attendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                semester: semesterCode,
                course_id: course,
                date,
                records: formattedStudents
            }),
        })
            .then(res => {
                if (res.ok) alert("Attendance submitted!");
                else throw new Error("Failed to submit");
            })
            .catch(err => alert("Error: " + err.message));
    };

    return (
        <div className="faculty-attendance-container">
            <Sidebar />
            <div className="attendance-content">
                <h2 className="dashboard-title">Faculty Attendance</h2>
                <p className="dashboard-subtitle">Mark attendance for your students</p>

                <div className="attendance-controls">
                    <div className="dropdown-group">
                        <label>Semester</label>
                        <select value={semester} onChange={(e) => {
                            setSemester(e.target.value);
                            setCourse("");
                            setStudents([]);
                        }}>
                            <option value="">-- Select Semester --</option>
                            {Object.keys(semesterMap).map((label) => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {semester && (
                        <div className="dropdown-group">
                            <label>Course</label>
                            <select value={course} onChange={(e) => {
                                setCourse(e.target.value);
                                setStudents([]);
                            }}>
                                <option value="">-- Select Course --</option>
                                {courses.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.code} - {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {course && (
                        <div className="dropdown-group">
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    )}
                </div>

                {students.length > 0 && (
                    <>
                        <div className="attendance-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Name</th>
                                        <th>Student ID</th>
                                        <th>Date</th>
                                        <th>Mark Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s, i) => (
                                        <tr key={s.student_id}>
                                            <td>{i + 1}</td>
                                            <td>{s.name}</td>
                                            <td>{s.student_id}</td>
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

                        <div className="action-buttons">
                            <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back</button>
                            <button className="submit-btn" onClick={handleSubmit}>Submit Attendance</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FacultyAttendance;
