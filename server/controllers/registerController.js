const User = require("../model/User");
const handleNewUser = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID is required." });

  // check for duplicate username in the db
  const duplicate = await User.findOne({ uuid: id }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    await User.create({ uuid: id });
    res.status(201).json({ success: `New User with id '${id}' created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
