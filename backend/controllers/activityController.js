const pool = require("../config/db");

const getActivities = async (req, res) => {
  try {
    const activities = await pool.query(
      `SELECT *
       FROM activity_logs
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [req.user.id]
    );

    res.json(activities.rows);
  } catch (error) {
    console.error("Get Activities Error:", error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

module.exports = {
  getActivities,
};