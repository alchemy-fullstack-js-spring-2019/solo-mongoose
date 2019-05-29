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
    type: String,
    minlength: 5,
    maxlength: 256
  },
  tag: {
    type: String,
    required: true,
    enum: ['person', 'cat']
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  retweets: {
    type: [String]
  },
  address: {
    street: String,
    zipcode: String,
    city: String
  }
});
// Tweet model
// Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc
const Tweet = mongoose.model('Tweet', tweetsSchema);

// Tweet.create({ handle: 'laura', body: 'my tweet' })
//   .then(tweet => console.log(tweet))
//   .finally(() => mongoose.connection.close());


Tweet
  .create({ handle: 'laura', body: 'my first tweet' })
  .then(createdTweet => {
    return Tweet.findById(createdTweet._id);
  })
  .then(foundTweet => console.log(foundTweet));

Tweet.findById('5cb61a479e6b250bbdd9321b')
  .then(foundTweet => console.log(foundTweet))
  .finally(() => {
    mongoose.connection.close();
  });

Tweet
  .findByIdAndUpdate('5cb61a479e6b250bbdd9321b', { handle: 'bingo' }, { new: true })
  .then(updatedTweet => console.log(updatedTweet))
  .finally(() => {
    mongoose.connection.close();
  });

Tweet
  .findByIdAndDelete('5cb61a479e6b250bbdd9321b')
  .then(result => console.log(result))
  .finally(() => {
    mongoose.connection.close();
  });

Tweet
  .find()
  .then(foundTweets => console.log(foundTweets))
  .finally(() => {
    mongoose.connection.close();
  });
