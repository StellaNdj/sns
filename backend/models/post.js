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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, {timestamps: true});

// Delete comments when post is deleted
postSchema.pre('remove', async function(next) {
  try {
    await this.model('Comment').deleteMany({ _id: { $in: this.comments } });
    next();
  } catch (error) {
    next(error);
  }
})

module.exports = mongoose.model('Post', postSchema);
