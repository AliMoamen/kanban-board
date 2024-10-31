const User = require("../model/User");
// Get All Boards
const getBoards = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const boards = user.boards;
    res.status(200).json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Add a new board
const addBoard = async (req, res) => {
  const { userId } = req.params;
  const { title, columns } = req.body; // Expecting { title: 'New Board', columns: [...] }

  try {
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new board object
    const newBoard = {
      title,
      columns: columns || [], // Initialize with empty array if no columns provided
    };

    user.boards.push(newBoard); // Add the new board to the user's boards
    await user.save(); // Save the updated user document

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
  const { title, columns } = req.body; // Expecting { title: 'new title', columns: [...] }

  try {
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Update board title
    if (title) {
      board.title = title;
    }

    // Update columns if provided
    if (Array.isArray(columns)) {
      board.columns = columns; // Update or replace columns as needed
    }

    await user.save(); // Save the updated user document
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
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.boards.id(boardId)) {
      return res.status(404).json({ message: "Board not found" });
    }
    user.boards = user.boards.filter(({ _id }) => _id.toString() !== boardId);

    await user.save(); // Save the updated user document
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
