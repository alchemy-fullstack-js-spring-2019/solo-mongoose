const mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/tweets', { 
  useNewUrlParser: true,
  useFindAndModify: false
});

// create tweet schema
const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    minLength: 10,
    maxLength: 256
  },
  tag: {
    type: String,
    required: true,
    enum: ['person', 'dog', 'db']
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  retweets: {
    type: [String]
  }
});

// create tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);

// create a new tweet
Tweet
  .create({ 
    handle: 'leland', 
    body: 'tweet number three',
    tag: 'person'
  })
  .then(createdTweet => console.log('\ncreated tweet:\n', createdTweet));

Tweet
  .find()
  .then(allTweets => console.log('\nAll stored tweets:\n', allTweets));
    
Tweet.findByIdAndUpdate('5cb625286aafee7bb1224b4c', { body: 'this is the first tweet, and it has been updated' })
  .then(updatedTweet => console.log('\nupdated tweet:\n', updatedTweet));
    
Tweet
  .create({ handle: 'mongo', body: 'the database tweets to itself again, but in vain', tag: 'db' })
  .then(createdTweet => createdTweet._id)
  .then(id => {
    return Tweet.findById(id);
  })
  .then(foundTweet => {
    console.log('\nFound Tweet:\n', foundTweet);
    return foundTweet._id;
  })
  .then(id => {
    return Tweet.findByIdAndDelete(id)
      .then(deletedTweet => console.log('\nDeleted Tweet:\n', deletedTweet));
  })
  .finally(() => {
    mongoose.connection.close();
  });
    


