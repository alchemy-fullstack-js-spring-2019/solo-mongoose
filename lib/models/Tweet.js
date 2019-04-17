const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Dog',
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 300
  }
});


const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
