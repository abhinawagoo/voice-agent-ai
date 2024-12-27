require("dotenv").config();
// console.log("OpenAI API Key:", process.env.OPENAI_API_KEY); // This will print the key to the console

const { OpenAI } = require("openai");

// Initialize OpenAIApi directly with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// Function to generate response based on prompt
const generateResponse = async (transcriptionText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Specify the model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that responds to voice messages.",
        },
        {
          role: "user",
          content: transcriptionText,
        },
      ], // Chat-based input
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error(`AI response generation failed: ${error.message}`);
  }
};

module.exports = { generateResponse };
