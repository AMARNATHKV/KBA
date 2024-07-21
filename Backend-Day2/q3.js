const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock function to simulate saving the review to the database
const saveReviewToDatabase = (review) => {
  console.log('Review saved to database:', review);
  // In a real application, this function would interact with your database
};

// Middleware to handle the review submission
function handleReviewSubmission(req, res) {
  const { title, content } = req.body;

  // Validate the review data
  if (!title) {
    return res.status(400).json({ error: 'Book title is required' });
  }

  if (!content) {
    return res.status(400).json({ error: 'Review content is required' });
  }

  // Simulate saving the review to the database
  saveReviewToDatabase({ title, content });

  // Send a success response
  res.status(201).json({ message: 'Review submitted successfully' });
}

// POST route to submit a review
app.post('/submit-review', handleReviewSubmission);

// Start the server
const port = 3008;
app.listen(port, () => {
  console.log(`Server is running `);
});