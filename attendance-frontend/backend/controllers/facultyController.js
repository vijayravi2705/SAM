const db = require('../config/db');

const semesterMap = {
    wis2425: 1,
    wks2425: 2
};

// 1. Fetch courses handled by faculty
const getFacultyCourses = (req, res) => {
    const facultyId = req.params.id;
    const semesterCode = req.query.semester;
    const semesterId = semesterMap[semesterCode];

    const query = `
    SELECT course_id AS id, course_name AS title, course_id AS code
    FROM course
    WHERE faculty_id = ? AND semester_id = ?
  `;

    db.query(query, [facultyId, semesterId], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json(results);
    });
};

// 2. Get students for a course in semester
const getStudentsForCourse = (req, res) => {
    const courseId = req.query.course;
    const semesterId = semesterMap[req.query.semester];

    const query = `
    SELECT student_id, name
    FROM student
    WHERE semester_id = ?
    AND student_id IN (
      SELECT DISTINCT student_id FROM attendance WHERE course_id = ?
    )
  `;

    db.query(query, [semesterId, courseId], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json(results);
    });
};

// 3. Mark attendance
const markAttendance = (req, res) => {
    const { course_id, semester, date, records } = req.body;
    const semesterId = semesterMap[semester];

    const values = records.map(r => [r.student_id, course_id, semesterId, date, r.status]);

    const query = `
    INSERT INTO attendance (student_id, course_id, semester_id, date, status)
    VALUES ?
    ON DUPLICATE KEY UPDATE status = VALUES(status)
  `;

    db.query(query, [values], (err) => {
        if (err) return res.status(500).json({ error: 'Insert failed' });
        res.json({ message: 'Attendance marked successfully' });
    });
};

const getDefaultersList = (req, res) => {
    const facultyId = req.params.id;
    const courseId = req.query.course;
    const semesterCode = req.query.semester;

    const semesterMap = {
        wis2425: 1,
        wks2425: 2
    };

    const semesterId = semesterMap[semesterCode];
    if (!semesterId || !courseId) {
        return res.status(400).json({ error: 'Invalid semester or course' });
    }

    const query = `
      SELECT 
        s.student_id,
        s.name,
        COUNT(a.id) AS total_classes,
        SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) as attended,
        ROUND((SUM(CASE WHEN a.status = 'p' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS attendance_percent
      FROM student s
      JOIN attendance a ON s.student_id = a.student_id
      WHERE a.course_id = ? AND a.semester_id = ?
      GROUP BY s.student_id, s.name
      HAVING attendance_percent < 75
    `;

    db.query(query, [courseId, semesterId], (err, defaulters) => {
        if (err) return res.status(500).json({ error: 'DB error while fetching defaulters' });

        // For each defaulter, fetch last 3 attendance records
        const promises = defaulters.map((student) => {
            return new Promise((resolve, reject) => {
                const recordQuery = `
            SELECT date, status FROM attendance
            WHERE student_id = ? AND course_id = ? AND semester_id = ?
            ORDER BY date DESC LIMIT 3
          `;
                db.query(recordQuery, [student.student_id, courseId, semesterId], (err, records) => {
                    if (err) return reject(err);
                    student.recent_attendance = records;
                    resolve();
                });
            });
        });

        Promise.all(promises)
            .then(() => res.json(defaulters))
            .catch(() => res.status(500).json({ error: 'Error fetching recent attendance' }));
    });
};



module.exports = {
    getFacultyCourses,
    getStudentsForCourse,
    markAttendance,
    getDefaultersList // ✅ This must be included
};
