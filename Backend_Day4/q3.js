const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

let reviews = []; // Array to store book reviews

// Middleware function to validate review input
const validateReviewInput = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }
  next();
};

// Route to handle review submission
app.post('/submit-review', validateReviewInput, (req, res) => {
  const { title, content } = req.body;
  const newReview = { title, content };
  reviews.push(newReview);
  res.status(201).json({ message: 'Review submitted successfully', review: newReview });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
