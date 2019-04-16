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

const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet
//   .create({ handle: 'Parker', text: 'Twitter Tweet Bay-Bee' })
//   .then(createdTweet => {
//     console.log(createdTweet);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

Tweet
  .find()
  .then(tweets => {
    console.log(tweets);
  })
  .finally(() => {
    mongoose.connection.close();
  });
