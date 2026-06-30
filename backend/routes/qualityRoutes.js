const express = require("express");
const protect = require("../middleware/authMiddleware");
const { analyzeQuality } = require("../controllers/qualityController");

const router = express.Router();

router.post("/", protect, analyzeQuality);

module.exports = router;