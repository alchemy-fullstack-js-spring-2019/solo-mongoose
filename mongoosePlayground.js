const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    minlength: 0,
    maxlength: 140
  },
  tag: {
    type: String,
    enum: ['puppers', 'piffen']
  },
  likes: {
    type: Number,
    required: true,
    default: 1
  },
  retweets: {
    type: Number,
    require: true,
    default: 0
  },
  address: {
    street: String,
    zipcode: String,
    city: String 
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet
// .create({ handle: 'ben', body: 'hello world' })
// .then(createdTweet => console.log(createdTweet))
// .finally(() => mongoose.connection.close());

// Tweet
// .create({ handle: 'billybob', body: 'howdy y\'all!', tag: 'piffen', likes: 4, retweets: 12 })
// .then(createdTweet => console.log(createdTweet))
// .finally(() => mongoose.connection.close());

// Tweet
// .find()
// .then(tweets => console.log(tweets))
// .finally(() => mongoose.connection.close());

// Tweet
// .findById('5cb6239174d00c81f764ded5')
// .then(foundTweet => console.log(foundTweet))
// .finally(() => mongoose.connection.close());

// Tweet
// .findByIdAndUpdate('5cb6239174d00c81f764ded5', { handle: 'Billy-Bob' }, { new: true })
// .then(updatedTweet => console.log(updatedTweet))
// .finally(() => mongoose.connection.close());

// Tweet
// .create({ handle: 'Chonky', body: 'halp i needz snaks' })
// .then(createdTweet => console.log(createdTweet))
// .finally(() => mongoose.connection.close());

// Tweet
// .find()
// .then(tweets => console.log(tweets))
// .finally(() => mongoose.connection.close());

Tweet
  .findByIdAndDelete('5cb623315ccda781940e04ce')
  .then(deletedTweet => console.log(deletedTweet));

Tweet
  .find()
  .then(tweets => console.log(tweets))
  .finally(() => mongoose.connection.close());
