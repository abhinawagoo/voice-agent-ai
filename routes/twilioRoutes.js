const express = require("express");
const router = express.Router();
const {
  processTranscription,
  processRecording,
} = require("../controllers/twilioController");

router.post("/process-transcription", processTranscription); // POST request for AI-powered responses
router.post("/process-recording", processRecording);

module.exports = router;
