const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const generateToken = require("../utils/jwt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, phone, bio, created_at`,
      [name, email, hashedPassword]
    );

    await pool.query(
      `INSERT INTO user_settings (user_id)
       VALUES ($1)`,
      [newUser.rows[0].id]
    );

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [newUser.rows[0].id, "Account registered"]
    );

    const token = generateToken(newUser.rows[0]);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await pool.query(
      `INSERT INTO activity_logs (user_id, action)
       VALUES ($1, $2)`,
      [user.id, "Logged in"]
    );

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const getMe = async (req, res) => {
  try {
    const userResult = await pool.query(
      `SELECT id, name, email, phone, bio, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userResult.rows[0]);
  } catch (error) {
    console.error("Get Me Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};