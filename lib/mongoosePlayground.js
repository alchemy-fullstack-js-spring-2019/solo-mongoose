// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/tweets', { 
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// const tweetSchema = new mongoose.Schema({
//   handle: {
//     type: String,
//     required: true
//   },
//   text: {
//     type: String,
//     required: true
//   }
// });

// const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet
//   .create({ handle: 'John', text: 'do it' })
//   .then(createdTweet => {
//     console.log(createdTweet);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .findByIdAndDelete('5cb619f07887fc4c5156369a', { new: true })
//   .then(deletedTweet => console.log(deletedTweet))
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .create({ handle: 'Steve', text: 'I love twitter' })
//   .then(createdTweet => {
//     return Tweet.findByIdAndDelete(createdTweet._id);
//   })
//   .then(deletedTweet => console.log(deletedTweet))
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .findByIdAndUpdate('5cb619f07887fc4c5156369a', { text: 'he did not do it' }, { new: true })
//   .then(updatedTweet => console.log(updatedTweet))
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .findById('5cb622cf927bd84ede6337ce')
//   .then(tweets => {
//     console.log(tweets);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// Tweet
//   .find()
//   .then(tweets => {
//     console.log(tweets);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });
