const { analyzeReplyQuality } = require("../services/qualityService");

const analyzeQuality = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        message: "Reply is required",
      });
    }

    const result = await analyzeReplyQuality(reply);

    res.json({
      success: true,
      quality: result,
    });
  } catch (error) {
    console.error("Quality Score Error:", error.response?.data || error);
    res.status(500).json({
      message: "Failed to analyze reply quality",
    });
  }
};

module.exports = {
  analyzeQuality,
};