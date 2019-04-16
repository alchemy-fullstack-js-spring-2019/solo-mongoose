const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myFirstDb', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 300
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

Tweet
  .create({ handle: 'meg', body: 'I love tweeting' })
  .then(createdTweet => {
    return Tweet.findById(createdTweet._id);
  })
  .finally(() => {
    
  })


