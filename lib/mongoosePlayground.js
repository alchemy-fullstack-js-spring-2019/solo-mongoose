const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', { useNewUrlParser: true });

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

// Tweet
//   .create({ handle: 'Tommy', body: 'Tweet1' })
//   .then(() => Tweet.find())
//   .then(console.log)
//   .finally(() => {
//     mongoose.connection.close();
//   });
// Tweet
//   .create({ handle: 'Tommy', body: 'Tweet2' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(console.log)
//   .finally(() => {
//     mongoose.connection.close();
//   });
// Tweet
//   .create({ handle: 'Tommy', body: 'Tweet2' })
//   .then(createdTweet => {
//     return Tweet.findByIdAndUpdate(createdTweet._id, { body: 'Tweet3' }, { new: true });
//   })
//   .then(console.log)
//   .finally(() => {
//     mongoose.connection.close();
//   });
Tweet
  .findByIdAndDelete('5cb620bde6a7cc3bf8f01751')
  .then(console.log)
  .finally(() => {
    mongoose.connection.close();
  });
