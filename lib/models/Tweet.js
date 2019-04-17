const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    maxlength: 140
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
