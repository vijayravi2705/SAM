const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/:id/defaulters', facultyController.getDefaultersList);

router.get('/:id/courses', facultyController.getFacultyCourses);
router.get('/:id/students', facultyController.getStudentsForCourse);
router.post('/:id/mark-attendance', facultyController.markAttendance);

module.exports = router;
