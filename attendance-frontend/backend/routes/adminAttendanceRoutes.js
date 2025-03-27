const express = require("express");
const router = express.Router();
const {
  getAllFaculty,
  getCoursesByFaculty,
  getStudentsForAdminAttendance,
  getDefaultersBySemester
} = require("../controllers/adminAttendanceController");

router.get("/faculty", getAllFaculty);
router.get("/faculty/:faculty_id/courses", getCoursesByFaculty);
router.post("/students", getStudentsForAdminAttendance); 
router.post("/defaulters/semester", getDefaultersBySemester);




module.exports = router;
