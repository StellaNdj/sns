require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/postRoutes');

// Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postsRoutes);

// Connect to db mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen on port
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port:', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err);
  })
