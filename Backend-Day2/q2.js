const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock function to simulate saving the user to the database
const saveUserToDatabase = (user) => {
  console.log('User saved to database:', user);
  // In a real application, this function would interact with your database
};

// Validation middleware function
function validateUserInput(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  next(); // Pass the request to the next middleware/route handler
}

// Registration processing middleware function
function processRegistration(req, res) {
  const { email, password } = req.body;

  // Simulate saving the user to the database
  saveUserToDatabase({ email, password });

  res.status(201).json({ message: 'User registered successfully' });
}

// Registration route using chained middleware
app.post('/register', validateUserInput, processRegistration);

// Start the server
const port = 3007;
app.listen(port, () => {
  console.log(`Server is running `);
});