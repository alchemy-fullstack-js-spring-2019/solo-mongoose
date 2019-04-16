const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myFirstDb', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 300
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

// Tweet
//   .create({ handle: 'meg', body: 'I love tweeting' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .create({ handle: 'bob', body: 'I love tweeting more than Meg' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

Tweet
  .findByIdAndUpdate('5cb62523bb245e20dda9a7d8', { handle: 'Megan' }, { new: true })
  .then(updatedTweet => console.log(updatedTweet))
  .finally(() => {
    mongoose.connection.close();
  });
