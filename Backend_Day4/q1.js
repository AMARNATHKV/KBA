const express = require('express');
const app = express();

// Middleware function to log incoming requests
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Apply the middleware to all routes
app.use(requestLogger);

// Example routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/products', (req, res) => {
  res.send('Products Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
