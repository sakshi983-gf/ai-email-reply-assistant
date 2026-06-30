const express = require("express");
const {
  generateReply,
  sendGeneratedEmail,
  getSentEmails,
  searchSentEmails,
  deleteSentEmail,
  improveReplyGrammar,
  rewriteGeneratedReply,
} = require("../controllers/emailController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateReply);
router.post("/send", protect, sendGeneratedEmail);
router.get("/sent", protect, getSentEmails);
router.get("/search", protect, searchSentEmails);
router.delete("/:id", protect, deleteSentEmail);
router.post("/grammar", protect, improveReplyGrammar);
router.post("/rewrite", protect, rewriteGeneratedReply);

module.exports = router;