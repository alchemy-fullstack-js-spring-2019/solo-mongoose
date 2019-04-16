const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});
// Tweet schema
//  Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
const tweetsSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
});
// Tweet model
// Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc
const Tweet = mongoose.model('Tweet', tweetsSchema);

Tweet.create({ handle: 'laura', body: 'my tweet' })
  .then(tweet => console.log(tweet))
  .finally(() => mongoose.connection.close());

// Tweet
//   .create({ handle: 'laura', body: 'my first tweet' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet));
