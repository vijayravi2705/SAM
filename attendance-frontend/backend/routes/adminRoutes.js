const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/faculty", adminController.getAllFaculty);
router.post("/faculty", adminController.addFaculty);
router.delete("/faculty/:id", adminController.deleteFaculty);
module.exports = router;
