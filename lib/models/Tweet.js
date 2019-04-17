const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  toyUser: {
    type: mongoose.Types.ObjectId,
    ref: 'Toy',
    required: true
  },
  body: {
    type: String, 
    required: true,
    maxlength: 256
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
