const Call = require("../models/Call.js");

// Create a new call record
const createCall = async (req, res) => {
  try {
    const { phoneNumber, callType, status } = req.body;
    const call = new Call({ phoneNumber, callType, status });
    await call.save();
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all call records
const getCalls = async (req, res) => {
  try {
    const calls = await Call.find();
    res.json(calls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCall, getCalls };
