const express = require('express');
const app = express();

const rateLimit = require('express-rate-limit');

// Configure rate-limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip // Use IP address as the key
});

// Apply the rate-limiting middleware to all routes
app.use(limiter);

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
