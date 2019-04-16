const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    minlength: 5,
    maxlength: 150,
    required: true
  },
  tags: {
    type: String,
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
