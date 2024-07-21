const express = require('express');
const app = express();

// Logging middleware function
function logRequests(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass the request to the next middleware/route handler
}

// Use the logging middleware for all routes
app.use(logRequests);

// Sample routes for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted!');
});

// Start the server
const port = 3006;
app.listen(port, () => {
  console.log(`Server is running `);
});