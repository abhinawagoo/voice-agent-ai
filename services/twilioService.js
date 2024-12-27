// // services/twilioService.js

// const twilio = require("twilio");

// // Set up Twilio client
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // Send an SMS or make a call

// module.exports = { sendSms };

require("dotenv").config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Store securely in .env
const authToken = process.env.TWILIO_AUTH_TOKEN; // Store securely in .env
const client = twilio(accountSid, authToken);

// Function to make a call
const makeCall = async (toNumber, fromNumber, url) => {
  try {
    const call = await client.calls.create({
      url, // Twilio XML URL to handle the call
      to: toNumber,
      from: fromNumber,
    });
    console.log(`Call initiated: ${call.sid}`);
    return call.sid;
  } catch (error) {
    console.error("Error making call:", error.message);
    throw new Error("Failed to initiate call");
  }
};

const sendSms = async (toNumber, fromNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: fromNumber, // Your Twilio number
      to: toNumber,
    });
  } catch (error) {
    throw new Error("SMS sending failed");
  }
};
module.exports = { makeCall, sendSms };
