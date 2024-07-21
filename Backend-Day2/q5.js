const express = require('express');
const axios = require('axios');
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

// Axios function to fetch data with timeout
async function fetchDataWithTimeout(url, timeout) {
  const source = axios.CancelToken.source();

  const timeoutId = setTimeout(() => {
    source.cancel(`Request timed out after ${timeout}ms`);
  }, timeout);

  try {
    const response = await axios.get(url, { cancelToken: source.token });
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error('Request canceled:', error.message);
    } else {
      console.error('Fetch error:', error);
    }
  }
}

// Example usage of the fetchDataWithTimeout function
app.get('/fetch-data', async (req, res) => {
  try {
    const data = await fetchDataWithTimeout('https://api.example.com/data', 5000);
    res.json(data);
  } catch (error) {
    res.status(500).send('Failed to fetch data');
  }
});

// Start the server
const port = 3006;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
