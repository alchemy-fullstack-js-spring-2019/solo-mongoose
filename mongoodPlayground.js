const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchem = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});
const Tweet = mongoose.model('Tweet', tweetsSchem);

// Tweet
//   .create({ handle: 'sven', body: 'my first tweet' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet));

// Tweet
//   .find()
//   .then(tweets => console.log(tweets));

// Tweet
//   .create({ handle: 'sven', body: 'my first tweet' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet));

// Tweet .create({ handle: 'sven', body: 'my first tweet' })
//   .then(createdTweet => {
//     return Tweet.findByIdAndUpdate(createdTweet._id, { body: 'hey there ho there' }, { new: true });
//   })
//   .then(updatedTweet => console.log(updatedTweet));


Tweet
  .findByIdAndDelete('5cb623014b7084418c1eb070')
  .then(deleted => console.log(deleted));


