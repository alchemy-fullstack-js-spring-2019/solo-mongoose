const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tweetSchema = new Schema({
  handle: {
    type: String,
    // required: true
  },
  body: {
    type: String,
    // required: true,
    maxlength: 50
      
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

