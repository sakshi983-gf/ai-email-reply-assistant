const logActivity = (message) => {
  console.log(`[MailPilot AI] ${new Date().toISOString()} - ${message}`);
};

module.exports = logActivity;