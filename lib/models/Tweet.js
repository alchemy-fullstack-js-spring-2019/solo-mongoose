const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: { // "handle" in the lab reqs
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }, required: false,
  body: { // "text" in the lab reqs
    type: String,
    required: true,
    maxLength: 256
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
