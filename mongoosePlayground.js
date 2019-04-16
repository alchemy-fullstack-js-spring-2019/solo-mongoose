const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true
});

const tweetSchema = new mongoose.Schema({
  handle: String,
  body: String
});

const Tweet = mongoose.model('Tweet', tweetSchema);

Tweet
  .create({ handle: 'cara', body: 'tweet one' })
  .then(createdTweet => console.log(createdTweet));
