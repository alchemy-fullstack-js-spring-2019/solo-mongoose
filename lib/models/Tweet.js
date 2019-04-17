const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Tweet', tweetSchema);
