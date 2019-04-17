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


Tweet
  .findByIdAndUpdate('5cb6251e01ede000e0aceec6', { handle: 'enkidu' }, { new: true })
  .then(updatedTweet => console.log(updatedTweet))
  .finally(() => {
    mongoose.connection.close();
  });
 









