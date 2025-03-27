const db = require("../config/db");

const getStudentsByCourse = (req, res) => {
  const { course_id, semester_id } = req.body;

  const query = `
    SELECT student_id, name, reg_no 
    FROM student 
    WHERE semester_id = ? AND student_id IN (
      SELECT student_id FROM student_courses WHERE course_id = ?
    )
  `;

  db.query(query, [semester_id, course_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching students" });
    res.json(results);
  });
};

module.exports = {
  getStudentsByCourse,
};
