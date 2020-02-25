const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  salt: String
});

module.exports = mongoose.model('users', userSchema);
