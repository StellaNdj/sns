const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
