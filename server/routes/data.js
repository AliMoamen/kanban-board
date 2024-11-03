const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
const taskController = require("../controllers/taskController");

// Routes for handling boards
router
  .route("/:userId/boards")
  .get(boardController.getBoards) // Retrieve all boards for a user
  .post(boardController.addBoard); // Add a new board for a user

router
  .route("/:userId/boards/:boardId")
  .put(boardController.editBoard) // Edit a specific board
  .delete(boardController.deleteBoard); // Delete a specific board

// Routes for handling tasks within a specific column of a board
router
  .route("/:userId/boards/:boardId/:columnId/tasks")
  .post(taskController.addTask); // Add a new task to a specific column

router
  .route("/:userId/boards/:boardId/:columnId/tasks/:taskId")
  .put(taskController.editTask) // Edit a specific task
  .delete(taskController.deleteTask); // Delete a specific task

module.exports = router;
