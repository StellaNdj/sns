const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
})

// Static sign up method

userSchema.static.signup = async function(firstName, lastName, email, password, username) {
  // Validation

  if(!firstName || !lastName || !email || !password || !username) {
    throw Error('All fields must be filled');
  }
}

module.exports = mongoose.model('User', userSchema);
