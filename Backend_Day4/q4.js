const express = require('express');
const app = express();

// Route to handle dynamic user ID
app.get('/welcome/:userId', (req, res) => {
  const { userId } = req.params; // Extract userId from route parameters
  res.send(`Welcome, User ${userId}!`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
