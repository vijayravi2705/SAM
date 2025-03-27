const db = require("../config/db");

// Get all faculty
const getAllFaculty = (req, res) => {
  const query = "SELECT faculty_id, name FROM faculty";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch faculty" });
    res.json(results);
  });
};

// Get courses taught by a faculty
const getCoursesByFaculty = (req, res) => {
  const { faculty_id } = req.params;
  const query = `
    SELECT fc.course_id, c.course_name, fc.semester_id 
    FROM faculty_classes fc
    JOIN course c ON fc.course_id = c.course_id
    WHERE fc.faculty_id = ?
  `;
  db.query(query, [faculty_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch courses" });
    res.json(results);
  });
};
const getStudentsForAdminAttendance = (req, res) => {
    const { faculty_id, course_id, semester_id } = req.body;
    console.log("Admin Attendance → Body Data:", req.body);
  
    const query = `
      SELECT s.student_id, s.name
      FROM faculty_student_course fsc
      JOIN student s ON fsc.student_id = s.student_id
      WHERE fsc.faculty_id = ? AND fsc.course_id = ? AND fsc.semester_id = ?
    `;
  
    db.query(query, [faculty_id, course_id, semester_id], (err, results) => {
      if (err) {
        console.error("DB Error fetching students:", err);
        return res.status(500).json({ error: "Failed to fetch students" });
      }
      res.json(results);
    });
  };



  const getDefaultersBySemester = (req, res) => {
    const { semester_id } = req.body;
  
    const query = `
      SELECT 
        s.name,
        s.student_id AS reg_no,
        ROUND(SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS attendance_percentage,
        GROUP_CONCAT(a.status ORDER BY a.date DESC SEPARATOR ',') AS all_statuses
      FROM attendance a
      JOIN student s ON a.student_id = s.student_id
      WHERE a.semester_id = ?
      GROUP BY s.student_id
      HAVING attendance_percentage < 75
    `;
  
    db.query(query, [semester_id], (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Failed to fetch defaulters" });
      }
  
      const formatted = results.map(row => ({
        name: row.name,
        reg_no: row.reg_no,
        attendance_percentage: row.attendance_percentage,
        last_3: row.all_statuses ? row.all_statuses.split(',').slice(0, 3) : []
      }));
  
      res.json(formatted);
    });
  };
  
  

module.exports = {
  getAllFaculty,
  getCoursesByFaculty,
  getStudentsForAdminAttendance,
  getDefaultersBySemester
};



