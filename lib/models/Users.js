const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
