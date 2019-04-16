const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchema = new mongoose.Schema({
  handle : {
    type: String,
    required: true
  },
  text :{
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

Tweet
  .create({ handle: 'fox', text: 'yeehaw' })
  .then(createdTweet => console.log(createdTweet))
  .finally(() => mongoose.connection.close());
