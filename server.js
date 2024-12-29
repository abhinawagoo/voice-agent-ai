const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// importScripts
const callRoutes = require("./routes/callRoutes");
const aiRoutes = require("./routes/aiRoutes");
const twilioRoutes = require("./routes/twilioRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api", callRoutes);
app.use("/agent", aiRoutes);
app.use("/twilio", twilioRoutes);

app.post("/twilio/process-recording", (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const callSid = req.body.CallSid;

  console.log("Recording URL:", recordingUrl);
  console.log("Call SID:", callSid);

  res.status(200).send("Recording received");
});

// Default route
app.get("/", (req, res) => {
  res.send("Voice Agent AI API is running...");
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
