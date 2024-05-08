const express = require('express');
const { loginUser, signupUser, userInfos, usernameInfos } = require('../controllers/userController');

const router = express.Router();

// Sign up route
router.post('/signup', signupUser);

// Log in route
router.post('/login', loginUser);

// Find user infos
router.get('/:email', userInfos);

// Find user infos from username;
router.get('/username/:username', usernameInfos);

module.exports = router;
