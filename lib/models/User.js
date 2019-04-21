const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  handle: {
    required: true,
    type: String,
    maxlength: 16
  },
  image: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

