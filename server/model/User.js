const mongoose = require("mongoose");

// Define the Subtask schema
const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the subtask, required field
  isCompleted: { type: Boolean, default: false }, // Completion status of the subtask, default is false
});

// Define the Task schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the task, required field
  description: { type: String }, // Description of the task, optional field
  subtasks: [SubtaskSchema], // Subtasks as an array of subdocuments
  status: { type: String, required: true }, // Status of the task, required field
});

// Define the Column schema
const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the column, required field
  tasks: [TaskSchema], // Tasks as an array of subdocuments
});

// Define the Board schema
const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the board, required field
  columns: [ColumnSchema], // Columns as an array of subdocuments
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true }, // Unique user identifier, required field
  name: { type: String, required: true }, // Name of the user, required field
  email: { type: String, required: true, unique: true }, // Email of the user, required and unique field
  picture: { type: String, required: true }, // URL of the user's picture, required field
  boards: [BoardSchema], // Boards as an array of subdocuments
});

// Create models
module.exports = mongoose.model("User", UserSchema); // Export the User model
