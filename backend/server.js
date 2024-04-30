require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/userRoutes');
const commentsRoutes = require('./routes/commentRoutes');

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
})

// Routes
app.use('/api/posts', postsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/posts', commentsRoutes);

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
