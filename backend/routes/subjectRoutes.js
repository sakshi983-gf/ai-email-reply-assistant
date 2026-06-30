const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createSubject } = require("../controllers/subjectController");

const router = express.Router();

router.post("/", protect, createSubject);

module.exports = router;