const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    match: /\w*@\w*\.\w*/g
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
