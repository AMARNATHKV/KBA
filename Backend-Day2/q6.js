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

// Async function to fetch and filter posts
async function fetchAndFilterPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    const filteredPosts = posts.filter(post => post.userId === 1);
    return filteredPosts.map(post => post.title);
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// Endpoint to get filtered post titles
app.get('/filtered-posts', async (req, res) => {
  const titles = await fetchAndFilterPosts();
  res.json(titles);
});

// Start the server
const port = 3006;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
