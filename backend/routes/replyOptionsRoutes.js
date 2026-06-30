const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createReplyOptions } = require("../controllers/replyOptionsController");

const router = express.Router();

router.post("/", protect, createReplyOptions);

module.exports = router;