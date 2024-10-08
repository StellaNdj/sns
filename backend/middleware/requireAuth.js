const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = async (req, res, next) => {
  // Verify auth

  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(402).json({error: 'Authorization token is required'});
  }

  const token = authorization.split(" ")[1];

  try {
    const {_id} = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({_id}).select('_id firstName lastName username');

    next()
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(401).json({error: 'Request not authorized'});
  }
}

module.exports = requireAuth;
