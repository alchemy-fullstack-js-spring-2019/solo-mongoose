const mongoose = require('mongoose');

//kind of like making the Store class but without the methods? Designing what the tweets will require. Making the skeleton of every tweet. 
const tweetSchema = new mongoose.Schema({
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

const TweetSchema = mongoose.model('Tweet', tweetSchema);

module.exports = TweetSchema;
