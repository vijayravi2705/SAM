const express = require("express");
const router = express.Router();
const studentDataController = require("../controllers/studentDataController");

// Route to fetch students based on course and semester
router.post("/by-course", studentDataController.getStudentsByCourse);

module.exports = router;
