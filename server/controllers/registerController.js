const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { id } = req.body;

  // Validate request body
  if (!id) {
    return res.status(400).json({ message: "ID is required." });
  }

  try {
    // Check for duplicate user ID in the database
    const isDuplicate = await User.exists({ uuid: id });
    if (isDuplicate) {
      return res
        .status(409)
        .json({ message: `User with id '${id}' already exists.` });
    }

    // Create new user
    await User.create({ uuid: id });
    res.status(201).json({ success: `New User with id '${id}' created!` });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { handleNewUser };
