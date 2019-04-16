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

// Tweet.create({ handle: 'emily', text: 'look another tweet' })
  // .then(createdTweet => console.log(createdTweet));

// Tweet
  // .create({ handle: 'emily', text: 'another tweet' })
  // .then(createdTweet => {
  //   return Tweet.findById(createdTweet._id)
  // })
  // .then(foundTweet => console.log(foundTweet));

  // Tweet
  //   .findByIdAndUpdate('5cb634e7309718ee8cc6a109', { text: 'hello' })
  //   .then(updatedTweet => console.log(updatedTweet))
  //   .finally(() => {
  //     mongoose.connection.close();
  //   });

  // Tweet
  //   .findByIdAndDelete('5cb634e7309718ee8cc6a109')
  //   .then(result => console.log(result))
  //   .finally(() => {
  //     mongoose.connection.close();
  //   });

  // Tweet
  //   .find()
  //   .then(foundTweets => console.log(foundTweets))
  //   .finally(() => {
  //     mongoose.connection.close();
  //   });
