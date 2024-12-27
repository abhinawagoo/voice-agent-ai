require("dotenv").config();

const { makeCall, sendSms } = require("../services/twilioService");

// const initiateCall = async (req, res) => {
//   try {
//     const { to } = req.body; // Expecting `to` (destination number) from the request body
//     const from = process.env.TWILIO_PHONE_NUMBER; // Use your Twilio number
//     const url = "http://demo.twilio.com/docs/voice.xml"; // Update with your XML URL
//     const textMessage =
//       "Hello, this is a test message from your Voice AI agent!";

//     const callSid = await makeCall(to, from, url);
//     const sendmessage = await sendSms(to, from, textMessage);

//     res
//       .status(200)
//       .json({ message: "Call initiated successfully", callSid, sendmessage });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Failed to initiate call" });
//   }
// };

// Initiate a Call with Speech-to-Text Capability
const initiateCall = async (req, res) => {
  try {
    const { to } = req.body;

    const call = await client.calls.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: `<Response>
                <Say>Please speak after the beep. We will process your response.</Say>
                <Record maxLength="10" transcribe="true" action="/api/process-transcription" />
              </Response>`,
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
    const recordingUrl = req.body.RecordingUrl;
    const transcriptionText = req.body.TranscriptionText;

    console.log("Recording URL:", recordingUrl);
    console.log("Transcription:", transcriptionText);

    // Generate AI response using OpenAI
    const aiResponse = await generateResponse(transcriptionText);

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
// module.exports = { initiateCall };
