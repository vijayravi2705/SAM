const express = require('express');
const router = express.Router();
const {
  submitAttendance,
  getDefaulters,
  downloadDefaultersCSV,
} = require('../controllers/facultyController');

router.post('/attendance', submitAttendance);
router.get('/defaulters', getDefaulters);
router.get('/defaulters/csv', downloadDefaultersCSV);

module.exports = router;
