const express = require('express');
const {loginUser, signupUser, userInfos} = require('../controllers/userController');

const router = express.Router();

// Sign up route
router.post('/signup', signupUser);

// Log in route
router.post('/login', loginUser);

// Find user infos
router.get('/:email', userInfos);

module.exports = router;
