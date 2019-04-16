const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tweets', { 
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

const Tweet = mongoose.model('Tweet2', tweetSchema);

Tweet
  .create({ handle: 'blah', text: 'this is a tweet' })
  .then(createdTweet => {
    return Tweet.findById(createdTweet._id);
  })
  .then(foundTweet => console.log(foundTweet))
  .finally(() => {
    mongoose.connection.close();
  });
