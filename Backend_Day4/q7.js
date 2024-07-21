const express = require('express');
const app = express();

// Middleware function to log the client's IP address
const logClientIp = (req, res, next) => {
  const clientIp = req.ip; // Get the IP address of the client
  console.log(`Client IP: ${clientIp}`);
  next(); // Pass control to the next middleware or route handler
};

// Apply the IP logging middleware to all routes
app.use(logClientIp);

// Example routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
