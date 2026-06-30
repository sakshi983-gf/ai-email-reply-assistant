const { generateReplyOptions } = require("../services/replyOptionsService");

const createReplyOptions = async (req, res) => {
  try {
    const { receivedEmail, subject, purpose } = req.body;

    if (!receivedEmail || !purpose) {
      return res.status(400).json({
        message: "Received email and purpose are required",
      });
    }

    const result = await generateReplyOptions({
      receivedEmail,
      subject,
      purpose,
    });

    res.json({
      success: true,
      options: result.options,
    });
  } catch (error) {
    console.error("Reply Options Error:", error.response?.data || error);
    res.status(500).json({
      message: "Failed to generate reply options",
    });
  }
};

module.exports = {
  createReplyOptions,
};