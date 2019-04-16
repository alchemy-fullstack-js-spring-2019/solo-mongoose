const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 256
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);
