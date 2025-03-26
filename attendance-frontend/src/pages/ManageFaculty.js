import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./ManageFaculty.css";


const ManageFaculty = () => {
    
    const [facultyList, setFacultyList] = useState([
        {
            id: 1,
            name: "Dr. Arjun Rao",
            email: "arjun@sam.edu",
            department: "CSE",
            classes: ["BIT401L", "BIT410L"]
        }
    ]);

    const [newFaculty, setNewFaculty] = useState({
        name: "",
        email: "",
        department: "",
        classes: ""
    });

    const handleAddFaculty = () => {
        const newEntry = {
            ...newFaculty,
            id: facultyList.length + 1,
            classes: newFaculty.classes.split(",").map(cls => cls.trim())
        };
        setFacultyList([...facultyList, newEntry]);
        setNewFaculty({ name: "", email: "", department: "", classes: "" });
    };

    const handleDelete = (id) => {
        const updatedList = facultyList.filter(f => f.id !== id);
        setFacultyList(updatedList);
    };

    return (
        <div className="manage-faculty-container">
            <Sidebar />
            <div className="manage-faculty-content">
                <h2 className="title">Manage Faculty</h2>

                <div className="add-form">
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
                        placeholder="Classes (comma-separated)"
                        value={newFaculty.classes}
                        onChange={(e) => setNewFaculty({ ...newFaculty, classes: e.target.value })}
                    />
                    <button onClick={handleAddFaculty}>Add Faculty</button>
                </div>
                <div className="table-data">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl. No</th>
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
                                    <td>{faculty.name}</td>
                                    <td>{faculty.email}</td>
                                    <td>{faculty.department}</td>
                                    <td>{faculty.classes.join(", ")}</td>
                                    <td>
                                        <button onClick={() => handleDelete(faculty.id)}>🗑️</button>
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
