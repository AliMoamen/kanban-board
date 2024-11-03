const User = require("../model/User"); // Import the User model

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
  const { userId } = req.params; // Extract userId from request parameters
  const { name, email, picture } = req.query; // Get name, email, and picture from query parameters

  try {
    let user = await findUserById(userId); // Find user by UUID
    if (!user) {
      // If user does not exist, create a new user
      await User.create({ uuid: userId, name, email, picture });
    }
    user = await findUserById(userId); // Fetch the user again to get the updated data
    res.status(200).json(user.boards); // Respond with the user's boards
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

// Add a new board
const addBoard = async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters
  const { title, columns = [] } = req.body; // Extract title and columns from request body

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    const newBoard = { title, columns }; // Create a new board object
    user.boards.push(newBoard); // Add the new board to the user's boards array
    await user.save(); // Save the user document

    res
      .status(201)
      .json({ message: "Board created successfully", board: newBoard }); // Respond with success message and the new board
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

// Edit a board's name and columns
const editBoard = async (req, res) => {
  const { userId, boardId } = req.params; // Extract userId and boardId from request parameters
  const { title, columns } = req.body; // Extract title and columns from request body

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    const board = getBoardById(user, boardId); // Get the specific board by ID
    if (!board) return res.status(404).json({ message: "Board not found" }); // If board not found, respond with 404

    if (title) board.title = title; // Update board title if provided
    if (Array.isArray(columns)) board.columns = columns; // Update board columns if provided

    await user.save(); // Save the user document
    res.status(200).json({ message: "Board updated successfully", board }); // Respond with success message and the updated board
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

// Delete a board
const deleteBoard = async (req, res) => {
  const { userId, boardId } = req.params; // Extract userId and boardId from request parameters

  try {
    const user = await findUserById(userId); // Find user by UUID
    if (!user) return res.status(404).json({ message: "User not found" }); // If user not found, respond with 404

    const board = getBoardById(user, boardId); // Get the specific board by ID
    if (!board) return res.status(404).json({ message: "Board not found" }); // If board not found, respond with 404

    user.boards = user.boards.filter(({ _id }) => _id.toString() !== boardId); // Remove the board from the user's boards array
    await user.save(); // Save the user document

    res.status(200).json({ message: "Board deleted successfully" }); // Respond with success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message }); // Handle server error
  }
};

module.exports = {
  getBoards,
  addBoard,
  editBoard,
  deleteBoard,
};
