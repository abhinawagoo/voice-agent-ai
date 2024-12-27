// controllers/aiController.js

const openaiService = require("../services/aiService");

// Get AI-generated response (example for lead generation)
const getAiResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openaiService.generateResponse(prompt);
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAiResponse };
