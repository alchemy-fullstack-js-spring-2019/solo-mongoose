const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  condition: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
