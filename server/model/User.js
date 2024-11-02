const mongoose = require("mongoose");

// Define the Subtask schema
const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

// Define the Task schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subtasks: [SubtaskSchema], // Subtasks as an array of subdocuments
  status: { type: String, required: true },
});

// Define the Column schema
const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [TaskSchema], // Tasks as an array of subdocuments
});

// Define the Board schema
const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columns: [ColumnSchema], // Columns as an array of subdocuments
});

// Define the User schema
const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  boards: [BoardSchema], // Boards as an array of subdocuments
});

// Create models
module.exports = mongoose.model("User", UserSchema);
