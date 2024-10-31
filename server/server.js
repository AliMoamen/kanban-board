require("dotenv").config(); // Access Environment Variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse Incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse Income URL encoded requests
app.use(cors()); // Allow to make request from allowed origins

// Routes
app.use("/register", require("./routes/register"));
app.use("/data", require("./routes/data"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
