// routes/aiRoutes.js

const express = require("express");
const router = express.Router();
const { getAiResponse } = require("../controllers/aiController");

// Define your AI response route here
router.post("/ai-response", getAiResponse); // POST request for AI-powered responses

module.exports = router;
