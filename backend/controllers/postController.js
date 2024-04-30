const Post = require('../models/post');
const mongoose = require('mongoose');

// GET all post
const getPosts = async (req, res) => {
  const posts = await Post.find({})
    .sort({createdAt: -1})
    .populate('user')
    .populate('comments');
  res.status(200).json(posts)
}

// GET a post
const getPost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post'});
  }

  const post = await Post.findById(id)
    .populate(['user','comment']);

  if(!post) {
    return res.status(400).json({error: 'No such post found'});
  }

  res.status(200).json(post);

}

// CREATE post
const createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const user = req.user.id;
    const post = await Post.create({content, user});

    res.status(200).json(post);

  } catch (error) {
    res.status(400).json({error: error.message});
  };
}

// DELETE post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Id invalid, no such post'});
  };

  const post = await Post.findOneAndDelete({_id: id});

  if(!post) {
    res.status(400).json({error: 'No such post found'});
  };

  res.status(200).json(post);
}

// UPDATE post
const updatePostContent = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Id invalid, no such post'});
  };

  const post = await Post.findOneAndUpdate(
    { _id: id },
    { content: content },
    { new: true }
  );

  if(!post) {
    res.status(400).json({error: 'No such post found'});
  };

  res.status(200).json(post);
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePostContent,
}
