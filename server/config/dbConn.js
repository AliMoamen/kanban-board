const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection string from environment variables
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log("Connected to MongoDB"); // Log a message when connected to MongoDB
  } catch (err) {
    console.error(err); // Log any errors that occur during connection
  }
};

module.exports = connectDB; // Export the connectDB function
