const pool = require("../config/db");
const { generateAIReply, rewriteReply } = require("../services/aiService");
const improveGrammar = require("../services/grammarService");
const sendEmail = require("../services/emailService");

const generateReply = async (req, res) => {
  try {
    const { receivedEmail, purpose, tone, subject } = req.body;

    const reply = await generateAIReply({
      receivedEmail,
      purpose,
      tone,
      subject,
    });

    res.json({ message: "Reply generated successfully", reply });
  } catch (error) {
    console.error("Generate Reply Error:", error);
    res.status(500).json({ message: "Failed to generate reply" });
  }
};

const sendGeneratedEmail = async (req, res) => {
  try {
    const {
      receiverEmail,
      subject,
      receivedEmail,
      purpose,
      tone,
      generatedReply,
    } = req.body;

    await sendEmail({
      to: receiverEmail,
      subject,
      text: generatedReply,
    });

    const savedEmail = await pool.query(
      `INSERT INTO email_history
       (user_id, receiver_email, subject, received_email, reply_purpose, tone, generated_reply)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        req.user.id,
        receiverEmail,
        subject,
        receivedEmail,
        purpose,
        tone,
        generatedReply,
      ]
    );

    res.json({
      message: "Email sent successfully",
      email: savedEmail.rows[0],
    });
  } catch (error) {
    console.error("Send Email Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const getSentEmails = async (req, res) => {
  const emails = await pool.query(
    `SELECT * FROM email_history WHERE user_id = $1 ORDER BY sent_at DESC`,
    [req.user.id]
  );

  res.json(emails.rows);
};

const searchSentEmails = async (req, res) => {
  const { q } = req.query;

  const emails = await pool.query(
    `SELECT * FROM email_history
     WHERE user_id = $1
     AND (receiver_email ILIKE $2 OR subject ILIKE $2 OR generated_reply ILIKE $2)
     ORDER BY sent_at DESC`,
    [req.user.id, `%${q || ""}%`]
  );

  res.json(emails.rows);
};

const deleteSentEmail = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `DELETE FROM email_history WHERE id = $1 AND user_id = $2`,
    [id, req.user.id]
  );

  res.json({ message: "Email deleted successfully" });
};

const improveReplyGrammar = async (req, res) => {
  try {
    const { reply } = req.body;
    const improvedReply = await improveGrammar(reply);

    res.json({
      message: "Grammar improved successfully",
      reply: improvedReply,
    });
  } catch (error) {
    console.error("Grammar Error:", error);
    res.status(500).json({ message: "Failed to improve grammar" });
  }
};

const rewriteGeneratedReply = async (req, res) => {
  try {
    const { reply, tone } = req.body;
    const rewrittenReply = await rewriteReply({ reply, tone });

    res.json({
      message: "Reply rewritten successfully",
      reply: rewrittenReply,
    });
  } catch (error) {
    console.error("Rewrite Error:", error);
    res.status(500).json({ message: "Failed to rewrite reply" });
  }
};

module.exports = {
  generateReply,
  sendGeneratedEmail,
  getSentEmails,
  searchSentEmails,
  deleteSentEmail,
  improveReplyGrammar,
  rewriteGeneratedReply,
};