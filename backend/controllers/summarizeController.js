const { summarizeEmail } = require("../services/summarizeService");

const summarize = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email content is required",
      });
    }

    const summary = await summarizeEmail(email);

    res.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to summarize email",
    });
  }
};

module.exports = {
  summarize,
};