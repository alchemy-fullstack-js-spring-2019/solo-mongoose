const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Tweets', {
  useNewUrlParser: true
});

const tweetsSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

Tweet
  .create({ handle: 'Phoebe', text: 'first tweet' })
  .then(createdTweet => {
    console.log(createdTweet);
  });
