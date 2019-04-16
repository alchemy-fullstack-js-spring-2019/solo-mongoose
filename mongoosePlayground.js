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
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 125
  },
  tag: {
    type: String, //array of strings --> [String]
    required: true,
    enum: ['person', 'dog', 'cactus', 'random'] //only allows certain tags
  },
  followers:  {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  address: {
    street: String,
    city: String,
    state: String // these could each be their own thing...
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// create and find by ID
Tweet
  .create({ handle: 'cara', text: 'tweet one' })
  .then(createdTweet => {
    return Tweet.findById(createdTweet._id);
  })
  .then(foundTweet => console.log(foundTweet))
  .finally(() => mongoose.connection.close());

//Create, find by ID and delete
Tweet
  .create({ handle: 'cara', text: 'I love cactus', tag: 'cactus' })
  .then(newTweet => {
    return Tweet.findByIdAndDelete(newTweet._id);
  })
  .then(res => console.log(res))
  .finally(() => mongoose.connection.close());

//create, find by ID and update
Tweet
  .create({ handle: 'cara', text: 'I love cactus', tag: 'cactus' })
  .then(newTweet => {
    return Tweet.findByIdAndUpdate(newTweet._id, { text: 'I love mice' }, { new: true });
  })
  .then(res => console.log(res))
  .finally(() => mongoose.connection.close());

//find all tweets
Tweet.find()
  .then(tweets => console.log(tweets))
  .finally(() => mongoose.connection.close());
