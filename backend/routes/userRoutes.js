const express = require('express');
const {loginUser, signupUser} = require('../controllers/userController');

const router = express.Router();

// Sign up route
router.post('/signup', signupUser);

// Log in route
router.post('/login', loginUser);

module.exports = router;
