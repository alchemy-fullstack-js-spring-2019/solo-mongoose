const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet
//   .create({ handle: 'emily', text: 'my cool tweet' })
//   .then(createdTweet => console.log(createdTweet));

Tweet
  .find()
  .then(tweets => console.log(tweets));
