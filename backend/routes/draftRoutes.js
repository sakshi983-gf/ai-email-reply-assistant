const express = require("express");
const {
  saveDraft,
  getDrafts,
  getSingleDraft,
  updateDraft,
  deleteDraft,
} = require("../controllers/draftController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, saveDraft);
router.get("/", protect, getDrafts);
router.get("/:id", protect, getSingleDraft);
router.put("/:id", protect, updateDraft);
router.delete("/:id", protect, deleteDraft);

module.exports = router;