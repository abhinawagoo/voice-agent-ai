const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// importScripts
const callRoutes = require("./routes/callRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/calls", callRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Voice Agent AI API is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
