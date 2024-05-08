const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
};

// Sign up
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  try {
    const user = await User.signup(firstName, lastName, email, password, username);

    // Creating a token
    const token = createToken(user.id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}



// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Creating the token
    const token = createToken(user.id);
    const userId = user.id;
    const username = user.username;
    res.status(200).json({email, token, userId, username});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// User info for profile
const userInfos = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({email}).select('firstName lastName username');
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

// User info from username
const usernameInfos = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({username}).select('firstName lastName username');

    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}


module.exports = {
  loginUser,
  signupUser,
  userInfos,
  usernameInfos,
}
