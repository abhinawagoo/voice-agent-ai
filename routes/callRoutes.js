const express = require("express");
const { createCall, getCalls } = require("../controllers/callController.js");
const { initiateCall } = require("../controllers/twilioController");

const router = express.Router();

router.post("/calls", createCall); // Route to create a call record
router.get("/calls", getCalls); // Route to fetch all call records

router.post("/call", initiateCall); // Route to create a call record

module.exports = router;
