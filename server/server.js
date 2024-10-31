const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse Incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse Income URL encoded requests

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
