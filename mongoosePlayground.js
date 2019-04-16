const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

// Tweet.create({ handle: 'Auntie Mame', body: 'Life is a banquet' })
//   .then(tweet => console.log(tweet))
//   .finally(() => mongoose.connection.close());

Tweet.create({ handle: 'Solomon', body: 'meet me at the mines!' })
  .then(createdTweet => {
    return Tweet.findById(createdTweet._id);
  })
  .then(foundTweet => console.log(foundTweet));







