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
  body: {
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

Tweet
  .create({ handle: 'Mal', body: 'tweetin' })
  .then(createdTweet => console.log(createdTweet));

  Tweet
    .find()
    .then(tweets => console.log('******', tweets));

  Tweet
    .create({ handle: 'Mal', body: 'tweetin' })
    .then(createdTweet => {
      return Tweet.findById(createdTweet._id)
    })
    .then(foundTweet => 
      console.log(foundTweet));

    Tweet
      .findByIdAndUpdate('5cb626ec23f5e86076d4fecd', { handle: 'Ash' }, { new: true })
      .then(updatedTweet => console.log(updatedTweet))
