const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');

// Get all the post's comments
const getComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({post: postId})
    .sort({createdAt: -1})
    .populate('user');
  res.status(200).json(comments)
}

// Get a comment
const getComment = async (req, res) => {
  const { postId, commentId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({error: 'The id is invalid. No comment with that id'})
  };

  const comment = await Comment.findOne({_id: commentId, post: postId}).populate('user');

  if(!comment) {
    return res.status(404).json({error: `Comment doesn't exist` })
  }
  res.status(200).json(comment);
}

// Create a comment
const createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const user = req.user.id;
    const comment = await Comment.create({ content, user, post: postId });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(200).json(comment);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// Delete a comment
const deleteComment = async (req, res) => {
  const { postId } = req.params;
  const { commentId } = req.params;
  const { content } = req.body;

  if(!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({error: 'The id is invalid. No comment with that id'})
  };

  const comment = await Comment.findOneAndUpdate(
    { _id: commentId },
    { content: content },
    { new: true }
  );

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
  res.status(200).json(comment);
}

// Update a comment

const updateComment = async (req, res) => {

}

module.exports = {
  getComments,
  createComment,
  getComment,
  deleteComment,
}
