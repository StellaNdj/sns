const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  content: {
    type: String,
    required: true,
  },
  likes:  {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);
