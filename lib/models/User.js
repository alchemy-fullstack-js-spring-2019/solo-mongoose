const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/250'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
