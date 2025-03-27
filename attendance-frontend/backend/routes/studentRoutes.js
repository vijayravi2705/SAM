const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:id/attendance-summary', studentController.getAttendanceSummary);
router.get('/:id/courses', studentController.getCoursesBySemester);
router.get('/:id/attendance/:courseId', studentController.getCourseAttendance);

module.exports = router;
