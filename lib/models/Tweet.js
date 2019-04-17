const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  handle: { //can reference user schema
    type: { type: Schema.Types.ObjectId, ref: 'User' },
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
