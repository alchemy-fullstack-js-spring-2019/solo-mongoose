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
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet
//   .create({ handle: 'emily', text: 'my cool tweet' })
//   .then(createdTweet => console.log(createdTweet));

// Tweet
//   .find()
//   .then(tweets => console.log(tweets));

// Tweet
//   .create({ handle: 'ben', text: 'i am a cool dude' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => {
//     console.log(foundTweet);
//   })
//   .finally(()=> {
//     mongoose.connection.close();
//   });

Tweet
  .create({ handle: 'emily', text: 'this cool tweet' })
  .then(createdTweet => {
    return Tweet
      .findByIdAndUpdate(createdTweet._id, {
        text:'hi hi hi' });
  })
  .then(updatedTweet => console.log(updatedTweet))
  .finally(()=> {
    mongoose.connection.close();
  });
