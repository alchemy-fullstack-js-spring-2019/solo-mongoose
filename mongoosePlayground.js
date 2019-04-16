const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetSchema = new mongoose.Schema
({
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
//   .create({ handle: 'dave', text: 'hopefully this works' })
//   .then(createdTweet => console.log(createdTweet));

// Tweet
//   .find()
//   .then(tweets => console.log(tweets))
//   .finally(() => {
//     mongoose.connection.close();
//   });

Tweet
  .findById('5cb62520e67a1f205800aeec')
  .then(foundTweet => console.log(foundTweet))
  .finally(() => {
    mongoose.connection.close();
  });
