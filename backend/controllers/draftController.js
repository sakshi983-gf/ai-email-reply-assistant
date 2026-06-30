const pool = require("../config/db");

const saveDraft = async (req, res) => {
  try {
    const {
      receiverEmail,
      subject,
      receivedEmail,
      purpose,
      tone,
      draftReply,
    } = req.body;

    if (!draftReply) {
      return res.status(400).json({ message: "Draft reply is required" });
    }

    const draft = await pool.query(
      `INSERT INTO drafts
       (user_id, receiver_email, subject, received_email, reply_purpose, tone, draft_reply)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        req.user.id,
        receiverEmail,
        subject,
        receivedEmail,
        purpose,
        tone,
        draftReply,
      ]
    );

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [req.user.id, "Saved draft"]
    );

    res.status(201).json({
      message: "Draft saved successfully",
      draft: draft.rows[0],
    });
  } catch (error) {
    console.error("Save Draft Error:", error);
    res.status(500).json({ message: "Failed to save draft" });
  }
};

const getDrafts = async (req, res) => {
  try {
    const drafts = await pool.query(
      `SELECT *
       FROM drafts
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(drafts.rows);
  } catch (error) {
    console.error("Get Drafts Error:", error);
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};

const getSingleDraft = async (req, res) => {
  try {
    const { id } = req.params;

    const draft = await pool.query(
      `SELECT *
       FROM drafts
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );

    if (draft.rows.length === 0) {
      return res.status(404).json({ message: "Draft not found" });
    }

    res.json(draft.rows[0]);
  } catch (error) {
    console.error("Get Single Draft Error:", error);
    res.status(500).json({ message: "Failed to fetch draft" });
  }
};

const updateDraft = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      receiverEmail,
      subject,
      receivedEmail,
      purpose,
      tone,
      draftReply,
    } = req.body;

    const updated = await pool.query(
      `UPDATE drafts
       SET receiver_email = $1,
           subject = $2,
           received_email = $3,
           reply_purpose = $4,
           tone = $5,
           draft_reply = $6
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        receiverEmail,
        subject,
        receivedEmail,
        purpose,
        tone,
        draftReply,
        id,
        req.user.id,
      ]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Draft not found" });
    }

    res.json({
      message: "Draft updated successfully",
      draft: updated.rows[0],
    });
  } catch (error) {
    console.error("Update Draft Error:", error);
    res.status(500).json({ message: "Failed to update draft" });
  }
};

const deleteDraft = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM drafts
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Draft not found" });
    }

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [req.user.id, "Deleted draft"]
    );

    res.json({ message: "Draft deleted successfully" });
  } catch (error) {
    console.error("Delete Draft Error:", error);
    res.status(500).json({ message: "Failed to delete draft" });
  }
};

module.exports = {
  saveDraft,
  getDrafts,
  getSingleDraft,
  updateDraft,
  deleteDraft,
};