const express = require('express');
const app = express();

// Route that accepts a dynamic parameter for a user's ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Extract the user ID from the route parameter
  res.send(`Welcome, user with ID: ${userId}!`);
});

// Start the server
const port = 3009;
app.listen(port, () => {
  console.log(`Server is running `);
});