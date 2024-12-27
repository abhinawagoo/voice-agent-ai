require("dotenv").config();

// const { makeCall, sendSms } = require("../services/twilioService");

// // const initiateCall = async (req, res) => {
// //   try {
// //     const { to } = req.body; // Expecting `to` (destination number) from the request body
// //     const from = process.env.TWILIO_PHONE_NUMBER; // Use your Twilio number
// //     const url = "http://demo.twilio.com/docs/voice.xml"; // Update with your XML URL
// //     const textMessage =
// //       "Hello, this is a test message from your Voice AI agent!";

// //     const callSid = await makeCall(to, from, url);
// //     const sendmessage = await sendSms(to, from, textMessage);

// //     res
// //       .status(200)
// //       .json({ message: "Call initiated successfully", callSid, sendmessage });
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ error: "Failed to initiate call" });
// //   }
// // };

const twilio = require("twilio");

const { generateResponse } = require("../services/aiService");

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const initiateCall = async (req, res) => {
  try {
    const { to } = req.body; // Destination number from the request body
    const from = process.env.TWILIO_PHONE_NUMBER; // Twilio phone number from environment variables

    // TwiML XML to use 'Say' and 'Record' commands for speech-to-text
    const twiml = `<Response>
                    <Say>Please speak after the beep. We will process your response.</Say>
                    <Record maxLength="30" transcribe="true" action="https://a-67522428183.us-central1.run.app/twilio/process-transcription" />
                  </Response>`;

    const call = await client.calls.create({
      to: to,
      from: from,
      twiml: twiml, // Use the TwiML with speech-to-text functionality
    });

    res.status(200).json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error("Error initiating call:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to initiate call" });
  }
};

// Process Transcription After Recording
const processTranscription = async (req, res) => {
  try {
    const transcriptionText = req.body.TranscriptionText;
    console.log("Transcription:", transcriptionText);

    // You can now send the transcriptionText to an AI model for processing (like OpenAI)
    const aiResponse = await generateResponse(transcriptionText);

    // Create a Twilio response with the AI's message
    const response = new twilio.twiml.VoiceResponse();
    response.say(aiResponse, { voice: "alice" });

    res.type("text/xml");
    res.send(response.toString());
  } catch (error) {
    console.error("Error processing transcription:", error);
    res.status(500).send("Failed to process transcription");
  }
};

module.exports = { initiateCall, processTranscription };
