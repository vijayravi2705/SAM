const db = require('../config/db');

// Dashboard Attendance Summary
const getAttendanceSummary = (req, res) => {
    const studentId = req.params.id;

    const query = `
    SELECT 
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'P' THEN 1 ELSE 0 END) AS present
    FROM attendance
    WHERE student_id = ?
  `;

    db.query(query, [studentId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        const total = results[0].total || 0;
        const present = results[0].present || 0;
        const overall_attendance = total ? Math.round((present / total) * 100) : 0;

        res.json({ overall_attendance });
    });
};

// Courses for selected semester
const getCoursesBySemester = (req, res) => {
    const studentId = req.params.id;
    const semesterCode = req.query.semester;

    const semesterMap = {
        wis2425: 1,
        wks2425: 2
    };

    const semesterId = semesterMap[semesterCode];
    if (!semesterId) return res.status(400).json({ error: 'Invalid semester' });

    const query = `
    SELECT c.course_id AS id, c.course_name AS title, c.course_id AS code
    FROM course c
    JOIN attendance a ON a.course_id = c.course_id
    WHERE a.student_id = ? AND c.semester_id = ?
    GROUP BY c.course_id
  `;

    db.query(query, [studentId, semesterId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

// Attendance for selected course and semester
const getCourseAttendance = (req, res) => {
    const studentId = req.params.id;
    const courseId = req.params.courseId;
    const semesterCode = req.query.semester;

    const semesterMap = {
        wis2425: 1,
        wks2425: 2
    };

    const semesterId = semesterMap[semesterCode];
    if (!semesterId) return res.status(400).json({ error: 'Invalid semester' });

    const query = `
  SELECT id, date, 
  CASE 
    WHEN status = 'P' THEN 'present'
    ELSE 'absent'
  END AS status
FROM attendance
WHERE student_id = ? AND course_id = ? AND semester_id = ?

    ORDER BY date ASC
  `;

    db.query(query, [studentId, courseId, semesterId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};

module.exports = {
    getAttendanceSummary,
    getCoursesBySemester,
    getCourseAttendance
};
