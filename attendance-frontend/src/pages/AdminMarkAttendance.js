import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import "./AdminMarkAttendance.css";


const AdminMarkAttendance = () => {
    const navigate = useNavigate();
    const [facultyList, setFacultyList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [faculty, setFaculty] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [students, setStudents] = useState([]);

    // Fetch all faculty on page load
    useEffect(() => {
        fetch("http://localhost:5000/api/faculty")
            .then((res) => res.json())
            .then((data) => setFacultyList(data))
            .catch((err) => console.error("Error fetching faculty", err));
    }, []);

    // Fetch courses when a faculty is selected
    useEffect(() => {
        if (faculty) {
            fetch(`http://localhost:5000/api/admin/faculty/${faculty}/courses`)
                .then((res) => res.json())
                .then((data) => setCourseList(data))
                .catch((err) => console.error("Error fetching courses", err));
        }
    }, [faculty]);

    // ✅ Fetch students from renamed route
    useEffect(() => {
     
          
        const fetchStudents = async () => {
            if (course && date) {
                const semesterMap = {
                    "Winter Semester 2024-25 - VLR": 1,
                    "Weekend Semester 2024-25 - WKD": 2
                  };
                  
                  const selectedSemesterId = semesterMap[selectedSemester];
                try {
                    const res = await fetch("http://localhost:5000/api/admin/students", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            faculty_id: faculty,
                            course_id: course,
                            semester_id: selectedSemesterId,
                        }),
                    });


                    const data = await res.json();
                    console.log("Fetched students:", data); // ✅ Debug log
                    const formatted = data.map((s) => ({ ...s, status: "P" }));
                    setStudents(formatted);
                } catch (err) {
                    console.error("Error fetching students", err);
                }
            }
        };

        fetchStudents();
    }, [course, date]);

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
    };

    const toggleAttendance = (index) => {
        const updated = [...students];
        updated[index].status = updated[index].status === "P" ? "A" : "P";
        setStudents(updated);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                course_id: course,
                semester_id: 1,
                date,
                students: students.map((s) => ({
                    student_id: s.student_id,
                    status: s.status,
                })),
            };

            const res = await fetch("http://localhost:5000/api/admin/mark-attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            alert(data.message || "Attendance submitted");
        } catch (err) {
            console.error("Error submitting attendance", err);
            alert("Failed to submit attendance");
        }
    };

    return (
        <div className="admin-attendance-container">
            <Sidebar />
            <div className="attendance-content">
                <h2 className="dashboard-title">Mark Attendance (Admin)</h2>
                <p className="dashboard-subtitle">Select Faculty & Course to mark attendance</p>

                <div className="attendance-controls">
                    <div>
                      
                            <label>Semester</label>
                            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                                <option value="">-- Select Semester --</option>
                                <option value="Winter Semester 2024-25 - VLR">Winter Semester 2024-25 - VLR</option>
                                <option value="Weekend Semester 2024-25 - WKD">Weekend Semester 2024-25 - WKD</option>
                            </select>
                     
                        <label>Faculty</label>
                        <select value={faculty} onChange={handleFacultyChange}>
                            <option value="">-- Select Faculty --</option>
                            {facultyList.map((f) => (
                                <option key={f.faculty_id} value={f.faculty_id}>
                                    {f.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {faculty && (
                        <div>
                            <label>Course</label>
                            <select value={course} onChange={handleCourseChange}>
                                <option value="">-- Select Course --</option>
                                {courseList.map((c) => (
                                    <option key={c.course_id} value={c.course_id}>
                                        {c.course_id} - {c.course_name}
                                    </option>
                                ))}
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
                                    <th>Date</th>
                                    <th>Mark Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, i) => (
                                    <tr key={s.student_id}>
                                        <td>{i + 1}</td>
                                        <td>{s.name}</td>
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
                        <button className="go-back-btn" onClick={() => navigate(-1)}>
                            ⬅ Go Back
                        </button>
                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit Attendance
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMarkAttendance;
