const express = require('express');
const { getPosts, getPost, createPost, deletePost, updatePostContent } = require('../controllers/postController');
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
router.patch('/:id', updatePostContent);

module.exports = router;
