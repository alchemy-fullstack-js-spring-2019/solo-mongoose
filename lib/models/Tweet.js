const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  text: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true
  },
  tag: {
    type: String,
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
