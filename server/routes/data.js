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

router
  .route("/:userId/boards/:boardId/:columnId/tasks")
  .post(taskController.addTask);

router
  .route("/:userId/boards/:boardId/:columnId/tasks/:taskId")
  .put(taskController.editTask)
  .delete(taskController.deleteTask);

module.exports = router;
