const User = require("../model/User");

// Helper function to find a user by ID
const findUserById = async (userId) => {
  return await User.findOne({ uuid: userId });
};

// Helper function to get board, column, and task by ID
const getBoardColumnTask = (user, boardId, columnId, taskId = null) => {
  const board = user.boards.id(boardId);
  if (!board) return { error: "Board not found" };

  const column = board.columns.id(columnId);
  if (!column) return { error: "Column not found" };

  const task = taskId ? column.tasks.id(taskId) : null;
  if (taskId && !task) return { error: "Task not found" };

  return { board, column, task };
};

// Controller to add a new task
const addTask = async (req, res) => {
  const { userId, boardId, columnId } = req.params;
  const { title, description, subtasks, status } = req.body;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { board, column, error } = getBoardColumnTask(
      user,
      boardId,
      columnId
    );
    if (error) return res.status(404).json({ message: error });
    console.log({ title, description, subtasks, status });

    column.tasks.push({ title, description, subtasks, status });
    await user.save();
    res.status(200).json({ message: "Task added successfully", board });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to edit an existing task
const editTask = async (req, res) => {
  const { userId, boardId, columnId, taskId } = req.params;
  const { title, description, subtasks, status } = req.body;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { board, column, task, error } = getBoardColumnTask(
      user,
      boardId,
      columnId,
      taskId
    );
    if (error) return res.status(404).json({ message: error });

    Object.assign(task, { title, description, subtasks, status });
    await user.save();
    res.status(200).json({ message: "Task updated successfully", board });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to delete an existing task
const deleteTask = async (req, res) => {
  const { userId, boardId, columnId, taskId } = req.params;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { board, column, error } = getBoardColumnTask(
      user,
      boardId,
      columnId
    );
    if (error) return res.status(404).json({ message: error });

    column.tasks.pull({ _id: taskId });
    await user.save();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addTask, editTask, deleteTask };
