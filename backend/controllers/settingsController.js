const pool = require("../config/db");

const getSettings = async (req, res) => {
  try {
    const settings = await pool.query(
      `SELECT *
       FROM user_settings
       WHERE user_id = $1`,
      [req.user.id]
    );

    if (settings.rows.length === 0) {
      const created = await pool.query(
        `INSERT INTO user_settings (user_id)
         VALUES ($1)
         RETURNING *`,
        [req.user.id]
      );

      return res.json(created.rows[0]);
    }

    res.json(settings.rows[0]);
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { defaultTone, emailSignature, theme } = req.body;

    const updated = await pool.query(
      `UPDATE user_settings
       SET default_tone = $1,
           email_signature = $2,
           theme = $3
       WHERE user_id = $4
       RETURNING *`,
      [defaultTone, emailSignature, theme, req.user.id]
    );

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [req.user.id, "Updated settings"]
    );

    res.json({
      message: "Settings updated successfully",
      settings: updated.rows[0],
    });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};