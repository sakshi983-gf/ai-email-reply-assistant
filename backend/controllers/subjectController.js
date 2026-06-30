const { generateSubject } = require("../services/subjectService");

const createSubject = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email content is required",
      });
    }

    const subject = await generateSubject(email);

    res.json({
      success: true,
      subject,
    });
  } catch (error) {
    console.error("Subject Generate Error:", error.response?.data || error);
    res.status(500).json({
      message: "Failed to generate subject",
    });
  }
};

module.exports = {
  createSubject,
};