const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetsSchema = new mongoose.Schema({
  handle : {
    type: String,
    required: true
  },
  text :{
    type: String,
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);

//create
// Tweet
//   .create({ handle: 'fox', text: 'yeehaw' })
//   .then(createdTweet => console.log(createdTweet))
//   .finally(() => mongoose.connection.close());

//find by id
// Tweet
//   .create({ handle: 'badger', text: 'yum yum' })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => console.log(foundTweet));

//update
// Tweet
//   .create({ handle: 'snake', text: 'Devour it' })
//   .then(createdTweet => {
//     return Tweet.findByIdAndUpdate(createdTweet._id, { text: 'consider the self' });
//   })
//   .then(updatedTweeet => console.log(updatedTweeet));
    

//delete

Tweet
  .findByIdAndDelete('5cb62d4a40a98d0d7960a6c0')
  .then(deleted => console.log(deleted))
;