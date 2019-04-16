const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
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

const Tweet = mongoose.model('Tweet', tweetsSchema);


module.exports = Tweet;
