import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./ManageFaculty.css";

const ManageFaculty = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [newFaculty, setNewFaculty] = useState({
        faculty_id: "",
        name: "",
        email: "",
        department: "",
        classes: [{ course_id: "", semester_id: "" }]

    });

    // ✅ Use default fallback for local dev
    const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    // ✅ Fetch all faculty records on mount
    useEffect(() => {
        fetch(`${backendURL}/api/faculty`)
            .then(res => res.json())
            .then(data => setFacultyList(data))
            .catch(err => console.error("Error fetching faculty:", err));
    }, []);

    // ✅ Add new faculty
    const handleAddFaculty = async () => {
        
      
        try {
            const res = await fetch(`${backendURL}/api/faculty`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newFaculty),
            });
        
            const data = await res.json();
            setFacultyList([...facultyList, data]);
            setNewFaculty({
              faculty_id: "",
              name: "",
              email: "",
              department: "",
              classes: [{ course_id: "", semester_id: "" }]
            });
          } catch (err) {
            console.error("Error adding faculty:", err);
          }
        };

    // ✅ Delete faculty
    const handleDelete = async (id) => {
        try {
            await fetch(`${backendURL}/api/faculty/${id}`, {
                method: "DELETE"
            });
            setFacultyList(facultyList.filter(f => f.id !== id));
        } catch (err) {
            console.error("Error deleting faculty:", err);
        }
    };

    return (
        <div className="manage-faculty-container">
            <Sidebar />
            <div className="manage-faculty-content">
                <h2 className="title">Manage Faculty</h2>

                {/* Add Faculty Form */}
                <div className="add-form">
                    <input type="text" placeholder="Faculty ID" value={newFaculty.faculty_id}
                        onChange={(e) => setNewFaculty({ ...newFaculty, faculty_id: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Faculty Name"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={newFaculty.department}
                        onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Course ID (e.g., CS101)"
                        value={newFaculty.classes[0]?.course_id || ""}
                        onChange={(e) => {
                            const updatedClasses = [...newFaculty.classes];
                            updatedClasses[0] = { ...updatedClasses[0], course_id: e.target.value };
                            setNewFaculty({ ...newFaculty, classes: updatedClasses });
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Semester ID (e.g., 1)"
                        value={newFaculty.classes[0]?.semester_id || ""}
                        onChange={(e) => {
                            const updatedClasses = [...newFaculty.classes];
                            updatedClasses[0] = { ...updatedClasses[0], semester_id: parseInt(e.target.value) };
                            setNewFaculty({ ...newFaculty, classes: updatedClasses });
                        }}
                    />

                    <button onClick={handleAddFaculty}>Add Faculty</button>
                </div>

                {/* Faculty Table */}
                <div className="table-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Faculty ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Classes Handled</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facultyList.map((faculty, index) => (
                                <tr key={faculty.id}>
                                    <td>{index + 1}</td>
                                    <td>{faculty.faculty_id}</td>
                                    <td>{faculty.name}</td>
                                    <td>{faculty.email}</td>
                                    <td>{faculty.department}</td>
                                    <td>
                                        {Array.isArray(faculty.classes) && faculty.classes.length > 0
                                            ? faculty.classes.map(cls =>
                                                cls && cls.course_id && cls.course_name && cls.semester_id
                                                    ? `${cls.course_id} (${cls.course_name}) - Sem ${cls.semester_id}`
                                                    : "Invalid Class"
                                            ).join(", ")
                                            : "N/A"}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(faculty.faculty_id)}>🗑️</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageFaculty;
