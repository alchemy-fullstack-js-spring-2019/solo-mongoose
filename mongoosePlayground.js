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

// Tweet
// .create({ handle: 'imawaterbottle', text: 'covfefe' })
// .then(createdTweet => console.log(createdTweet))
// .finally(() => mongoose.connection.close());
  
// Tweet
//   .find()
//   .then(tweets => console.log(tweets))
//   .finally(() => mongoose.connection.close());

// Tweet
//   .create({ handle: 'ted', text: 'who am i' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet))
//   .finally(() => mongoose.connection.close());

// Tweet
//   .findById('5cb624bd37c4c06115fbcae6')
//   .then(foundTweet => console.log(foundTweet))
//   .finally(() => mongoose.connection.close());

// Tweet
//   .findByIdAndUpdate('5cb624bd37c4c06115fbcae6', { text: 'senor. covfefe' }, { new: true })
//   .then(updatedTweet => console.log(updatedTweet))
//   .finally(() => mongoose.connection.close());

Tweet
  .findByIdAndDelete('5cb624afee7b346107250594')
