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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  }
})

// Static sign up method

userSchema.statics.signup = async function(firstName, lastName, email, password, username) {
  // Validation

  if(!firstName || !lastName || !email || !password || !username) {
    throw Error('All fields must be filled');
  }

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  // Check if the email is not already in use
  const exist = await this.findOne({email});

  if(exist) {
    throw Error('Email already in use');
  }

  // Password hash for security
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({firstName, lastName, email, password: hash, username});

  return user;
}

// Log in static method
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if(!user) {
    throw Error(`User does not exist`);
  };

  const match = await bcrypt.compare(password, user.password);

  if(!match) {
    throw Error(`Password is incorrect`);
  }

  return user;
}

module.exports = mongoose.model('User', userSchema);
