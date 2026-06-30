const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const draftRoutes = require("./routes/draftRoutes");
const profileRoutes = require("./routes/profileRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const activityRoutes = require("./routes/activityRoutes");
const summarizeRoutes=require("./routes/summarizeRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const replyOptionsRoutes = require("./routes/replyOptionsRoutes");
const qualityRoutes = require("./routes/qualityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MailPilot AI Backend Running Successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/drafts", draftRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/summarize",summarizeRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/reply-options", replyOptionsRoutes);
app.use("/api/quality", qualityRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});