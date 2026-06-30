const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id, name, email, phone, bio, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, bio } = req.body;

    const updated = await pool.query(
      `UPDATE users
       SET name = $1,
           phone = $2,
           bio = $3
       WHERE id = $4
       RETURNING id, name, email, phone, bio, created_at`,
      [name, phone, bio, req.user.id]
    );

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [req.user.id, "Updated profile"]
    );

    res.json({
      message: "Profile updated successfully",
      user: updated.rows[0],
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};