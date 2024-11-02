const User = require("../model/User");

// Helper function to retrieve user by UUID
const findUserById = async (userId) => {
  return await User.findOne({ uuid: userId });
};

// Helper function to get a specific board by ID
const getBoardById = (user, boardId) => {
  return user.boards.id(boardId);
};

// Get all boards
const getBoards = async (req, res) => {
  const { userId } = req.params;
  const { name, email, picture } = req.query; // Get name and email from query parameters

  try {
    let user = await findUserById(userId);
    if (!user) {
      await User.create({ uuid: userId, name, email, picture });
    }
    user = await findUserById(userId); // Fetch the user again to get the updated data
    res.status(200).json(user.boards); // Respond with the user's boards
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new board
const addBoard = async (req, res) => {
  const { userId } = req.params;
  const { title, columns = [] } = req.body;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newBoard = { title, columns };
    user.boards.push(newBoard);
    await user.save();

    res
      .status(201)
      .json({ message: "Board created successfully", board: newBoard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Edit a board's name and columns
const editBoard = async (req, res) => {
  const { userId, boardId } = req.params;
  const { title, columns } = req.body;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const board = getBoardById(user, boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (title) board.title = title;
    if (Array.isArray(columns)) board.columns = columns;

    await user.save();
    res.status(200).json({ message: "Board updated successfully", board });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a board
const deleteBoard = async (req, res) => {
  const { userId, boardId } = req.params;

  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const board = getBoardById(user, boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    user.boards = user.boards.filter(({ _id }) => _id.toString() !== boardId);
    await user.save();

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getBoards,
  addBoard,
  editBoard,
  deleteBoard,
};
