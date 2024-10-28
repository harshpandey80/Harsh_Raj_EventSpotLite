// server.js
const express = require("express");
// const dotenv = require('dotenv');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://harsh-raj-eventspotlite.onrender.com/",
  "http://localhost:3000", // Uncomment for local dev if needed
];

app.use(cors(allowedOrigins));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port 5000"));
