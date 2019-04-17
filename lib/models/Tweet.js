const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: { //can reference user schema
    type: String, //mongoose.Types.ObjectId, ref: 'User' <- refers to schema
    required: true
  },
  text: {
    type: String,
    minlength: 5,
    maxlength: 150,
    required: true
  },
  tag: {
    type: String,
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
