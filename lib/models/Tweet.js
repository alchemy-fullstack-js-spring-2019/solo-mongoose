
//make server.js
// create a couple of tweet schemas, test them, 
//then try  to integrate it with express (app and app.test)
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
