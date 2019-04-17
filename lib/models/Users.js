const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  image: String
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
