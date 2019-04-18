const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 256
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
