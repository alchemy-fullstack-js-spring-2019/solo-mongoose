const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, // or Mixed??
    required: true
  }
}); 

const User = mongoose.model('User', userSchema);
module.exports = User;
