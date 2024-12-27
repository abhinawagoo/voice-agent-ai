const express = require("express");
const router = express.Router();
const { processTranscription } = require("../controllers/twilioController");

router.post("/process-transcription", processTranscription); // POST request for AI-powered responses

module.exports = router;
