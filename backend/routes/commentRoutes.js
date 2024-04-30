const express = require('express');
const { getComments, createComment, getComment, deleteComment } = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Fire middleware
router.use(requireAuth);

// Get comments
router.get('/:postId/comments', getComments);

// Create a comment
router.post('/:postId/comments', createComment);

// Get a comment
router.get('/:postId/comments/:commentId', getComment);

// Delete a comment
router.get('/:postId/comments/:commentId', deleteComment);

module.exports = router;
