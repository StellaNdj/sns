const express = require('express');
const { getPosts, getPost, createPost, deletePost, updatePostContent, updatePostLikes, getUserPosts } = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Fire middleware
router.use(requireAuth);

// GET all the posts
router.get('/', getPosts);

// GET a one post
router.get('/:id', getPost);

// CREATE a post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', deletePost);

// UPDATE a post content
router.patch('/content/:id', updatePostContent);

// UPDATE a post likes
router.patch('/likes/:id', updatePostLikes);

// GET all post for a user
router.get('/username/:userId', getUserPosts);

module.exports = router;
