const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

let users = []; // Array to store registered users

// Middleware function to validate user input
const validateUserInput = (req, res, next) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }
  next();
};

// Middleware function to process registration
const processRegistration = (req, res) => {
  const { email, name } = req.body;
  const newUser = { email, name };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};

// Route to handle user registration with chained middleware
app.post('/register', validateUserInput, processRegistration);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
