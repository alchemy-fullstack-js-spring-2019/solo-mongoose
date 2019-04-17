const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 256
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);


module.exports = Tweet;
