const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', { useNewUrlParser: true });

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

Tweet
  .create({ handle: 'imadog', text: 'woof woof woof' })
  .then(createdTweet => console.log(createdTweet))
  .finally(() => mongoose.connection.close());
