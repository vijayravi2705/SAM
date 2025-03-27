const express = require("express");
const router = express.Router();
const { markOrUpdateAttendance } = require("../controllers/adminAttendanceController");

router.post("/mark-attendance", markOrUpdateAttendance);

module.exports = router;
