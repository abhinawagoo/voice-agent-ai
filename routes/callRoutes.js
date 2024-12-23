const express = require("express");
const { createCall, getCalls } = require("../controllers/callController.js");

const router = express.Router();

router.post("/", createCall); // Route to create a call record
router.get("/", getCalls); // Route to fetch all call records

module.exports = router;
