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
  }
});

const Tweet = mongoose.model('Tweet2', tweetSchema);

Tweet
  .findByIdAndDelete('5cb61a32a2c6950fd9e72dd3')
  .then(deleted => console.log(deleted))
  .finally(() => {
    mongoose.connection.close();
  });
