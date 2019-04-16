const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 140
  },
  tags: {
    type: [String]
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
