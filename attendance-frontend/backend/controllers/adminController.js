const db = require("../config/db");

// 1. Get all faculty with classes handled
const getAllFaculty = (req, res) => {
  const facultyQuery = `SELECT * FROM faculty`;

  db.query(facultyQuery, (err, facultyList) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (facultyList.length === 0) return res.json([]);

    const ids = facultyList.map(f => f.faculty_id);

    const classQuery = `
      SELECT 
        fc.faculty_id, 
        fc.course_id, 
        c.course_name, 
        fc.semester_id
      FROM faculty_classes fc
      JOIN course c ON fc.course_id = c.course_id
      WHERE fc.faculty_id IN (?)
    `;

    db.query(classQuery, [ids], (err2, classList) => {
      if (err2) return res.status(500).json({ error: "DB error in faculty_classes join" });

      const groupedClasses = {};
      classList.forEach(cls => {
        if (!groupedClasses[cls.faculty_id]) groupedClasses[cls.faculty_id] = [];
        groupedClasses[cls.faculty_id].push({
          course_id: cls.course_id,
          course_name: cls.course_name,
          semester_id: cls.semester_id
        });
      });

      const enrichedFaculty = facultyList.map(f => ({
        ...f,
        classes: groupedClasses[f.faculty_id] || []
      }));

      res.json(enrichedFaculty);
    });
  });
};

// 2. Add new faculty and class mappings
const addFaculty = (req, res) => {
  const { faculty_id, name, email, department, classes } = req.body;

  const insertFacultyQuery = `
    INSERT INTO faculty (faculty_id, name, email, department)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertFacultyQuery, [faculty_id, name, email, department], (err) => {
    if (err) return res.status(500).json({ error: "Faculty insert failed", details: err });

    // Proceed only if classes exist
    if (classes && classes.length > 0) {
      const formattedClasses = classes.map(c => [faculty_id, c.course_id, c.semester_id]);

      const insertClassesQuery = `
        INSERT INTO faculty_classes (faculty_id, course_id, semester_id)
        VALUES ?
      `;

      db.query(insertClassesQuery, [formattedClasses], (err2) => {
        if (err2) return res.status(500).json({ error: "Class insert failed", details: err2 });

        res.status(201).json({
          faculty_id,
          name,
          email,
          department,
          classes
        });
      });
    } else {
      res.status(201).json({
        faculty_id,
        name,
        email,
        department,
        classes: []
      });
    }
  });
};


// 3. Delete faculty
const deleteFaculty = (req, res) => {
    const id = req.params.id;
  
    // First delete from faculty_classes
    const deleteClassesQuery = "DELETE FROM faculty_classes WHERE faculty_id = ?";
    db.query(deleteClassesQuery, [id], (err1) => {
      if (err1) return res.status(500).json({ error: "Error deleting classes" });
  
      // Then delete from faculty table
      const deleteFacultyQuery = "DELETE FROM faculty WHERE faculty_id = ?";
      db.query(deleteFacultyQuery, [id], (err2) => {
        if (err2) return res.status(500).json({ error: "Error deleting faculty" });
  
        res.json({ message: "Faculty deleted successfully" });
      });
    });
  };

    
  

module.exports = {
  getAllFaculty,
  addFaculty,
  deleteFaculty
};
