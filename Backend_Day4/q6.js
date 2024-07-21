const express = require('express');
const app = express();

let isMaintenanceMode = true; // Flag to control maintenance mode

// Middleware to handle maintenance mode
const maintenanceMiddleware = (req, res, next) => {
  if (isMaintenanceMode) {
    res.status(503).send('Service Unavailable. We are currently undergoing maintenance. Please try again later.');
  } else {
    next();
  }
};

// Apply the maintenance middleware to all routes
app.use(maintenanceMiddleware);

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
