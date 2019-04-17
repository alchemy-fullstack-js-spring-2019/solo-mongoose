const mongoose = require('mongoose');

const TweetsSchema = new mongoose.Schema({
  handle : {
    type: String,
    required: true
  },
  body : {
    type: String,
    required: true,
    maxlength: 250
  }
});

const Tweet = mongoose.model('Tweet', TweetsSchema)

module.exports = Tweet;
