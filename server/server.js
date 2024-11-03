require("dotenv").config(); // Load environment variables from a .env file into process.env
const express = require("express"); // Import the Express framework
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/dbConn"); // Import the database connection function
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port number, default to 3000 if not specified in environment variables

// Connect to MongoDB
connectDB(); // Establish a connection to the MongoDB database

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Middleware to parse incoming URL-encoded data
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing (CORS)

// Routes
app.use("/data", require("./routes/data")); // Define the route for handling data-related requests

// Event listener for successful MongoDB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB"); // Log a message when connected to MongoDB
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Start the server and listen on the specified port
});
