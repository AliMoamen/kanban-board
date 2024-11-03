const User = require("../model/User"); // Import the User model

// Helper function to find a user by ID
const findUserById = async (userId) => {
  return await User.findOne({ uuid: userId });
};

// Helper function to get board, column, and task by ID
const getBoardColumnTask = (user, boardId, columnId, taskId = null) => {
  const board = user.boards.id(boardId); // Get the board by ID
  if (!board) return { error: "Board not found" }; // Return error if board not found

  const column = board.columns.id(columnId); // Get the column by ID
  if (!column) return { error: "Column not found" }; // Return error if column not found

  const task = taskId ? column.tasks.id(taskId) : null; // Get the task by ID if taskId is provided
  if (taskId && !task) return { error: "Task not found" }; // Return error if task not found

  return { board, column, task }; // Return the board, column, and task
};

// Controller to add a new task
const addTask = async (req, res) => {
  const { userId, boardId, columnId } = req.params; // Extract userId, boardId, and columnId from request parameters
  const { title, description, subtasks, status } = req.body; // Extract title, description, subtasks, and status from request body

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    const { board, column, error } = getBoardColumnTask(
      user,
      boardId,
      columnId
    ); // Get the board and column
    if (error) return res.status(404).json({ message: error }); // If error, respond with 404

    column.tasks.push({ title, description, subtasks, status }); // Add the new task to the column's tasks array
    await user.save(); // Save the user document
    res.status(200).json({ message: "Task added successfully", board }); // Respond with success message and the updated board
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

// Controller to edit an existing task
const editTask = async (req, res) => {
  const { userId, boardId, columnId, taskId } = req.params; // Extract userId, boardId, columnId, and taskId from request parameters
  const { title, description, subtasks, status } = req.body; // Extract title, description, subtasks, and status from request body

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    // Fetch the board, column, and task
    const { board, column, task, error } = getBoardColumnTask(
      user,
      boardId,
      columnId,
      taskId
    );
    if (error) return res.status(404).json({ message: error }); // If error, respond with 404

    // Check if `status` matches `columnId`
    if (status !== columnId) {
      // Remove task from current column
      column.tasks = column.tasks.filter(
        (task) => task._id.toString() !== taskId
      );

      // Find the target column where task should be moved
      const targetColumn = board.columns.find(
        (col) => col._id.toString() === status
      );
      if (!targetColumn) {
        return res.status(404).json({ message: "Target column not found" }); // If target column not found, respond with 404
      }

      // Add the task to the target column
      targetColumn.tasks.push({ title, description, subtasks, status });
    } else {
      // If status matches, just update the task within the current column
      Object.assign(task, { title, description, subtasks, status });
    }

    // Save the changes
    await user.save();
    res.status(200).json({ message: "Task updated successfully", board }); // Respond with success message and the updated board
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

// Controller to delete an existing task
const deleteTask = async (req, res) => {
  const { userId, boardId, columnId, taskId } = req.params; // Extract userId, boardId, columnId, and taskId from request parameters

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    const { board, column, error } = getBoardColumnTask(
      user,
      boardId,
      columnId
    ); // Get the board and column
    if (error) return res.status(404).json({ message: error }); // If error, respond with 404

    column.tasks.pull({ _id: taskId }); // Remove the task from the column's tasks array
    await user.save(); // Save the user document
    res.status(200).json({ message: "Task deleted successfully" }); // Respond with success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

module.exports = { addTask, editTask, deleteTask };
