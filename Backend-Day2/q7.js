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

// Async function to fetch URLs and find the longest request
async function fetchUrls(urls) {
  const fetchPromises = urls.map(url => {
    const startTime = Date.now();
    return axios.get(url)
      .then(response => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        return { url, duration, response };
      })
      .catch(error => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        return { url, duration, error };
      });
  });

  const results = await Promise.all(fetchPromises);
  const longestRequest = results.reduce((max, current) => (current.duration > max.duration ? current : max), results[0]);
  
  return longestRequest;
}

// Endpoint to get the longest request URL and duration
app.get('/longest-request', async (req, res) => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  try {
    const longestRequest = await fetchUrls(urls);
    res.json({
      url: longestRequest.url,
      duration: `${longestRequest.duration}ms`
    });
  } catch (error) {
    res.status(500).send('Failed to fetch URLs');
  }
});

// Start the server
const port = 3006;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
