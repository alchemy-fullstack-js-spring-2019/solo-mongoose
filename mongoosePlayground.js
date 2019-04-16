const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', { useNewUrlParser: true, useFindAndModify: false });

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
//   .create({ handle: 'Robyn', text: 'tee-tee-tooweeet'})
//   .then(createdTweet => {
//     console.log(createdTweet);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .find()
//   .then(tweets => console.log(tweets)).finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .create({ handle: 'sparrow', text: 'brree brree'})
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet))
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .create({ handle: 'Morty', text: 'Gonna have to make a new handle...again' })
//     .then(createdTweet => {
//       return Tweet.findByIdAndUpdate(createdTweet._id, { handle: 'Marty M.' }, { new: true });
//     })
//     .then(updatedTweet => console.log(updatedTweet))
//     .finally(() => {
//       mongoose.connection.close();
//     });

// Tweet 
//   .findByIdAndDelete('5cb622f04ec86936d8985737')
//   .then(deleted => console.log(deleted))
//   .finally(() => {
//     mongoose.connection.close();
//   });
