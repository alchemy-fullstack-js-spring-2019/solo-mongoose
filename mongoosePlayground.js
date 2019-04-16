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
  },
  favNumber: {
    type: Number,
    required: true
  }
});

const Tweet = mongoose.model('Tweet2', tweetSchema);

Tweet
  .create({ handle: 'chris', text: 'binjo', favNumber: 10 })
  .then(createdTweet => console.log(createdTweet))
  .finally(() => {
    mongoose.connection.close();
  });
