const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tweets', {
  useNewUrlParser: true
});

const tweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }

});

const Tweet = mongoose.model('Tweet', tweetSchema);
//create
// Tweet
//   .create({ name: 'Sean', text: 'Hello there!' })
//   .then(createdTweet => console.log(createdTweet));
// //findByID
// Tweet
//   .findById('5cb61ae427209c18dd81b1ba')
//   .then(result => console.log(result));
//   //Create then find
Tweet
  .create({ name: 'Sean', text: 'Hello there!' })
  .then(created => {
    return Tweet.findById(created._id);
  })
  .then(found => console.log(found))
  .finally(() => mongoose.connection.close());



// Tweet
//   .findByIdAndUpdate('5cb6211fc9a0671bf4a2c9f6', { text: 'WoW' }, { new: true })
//   .then (result =>  console.log(result))
//   .finally(() => { mongoose.connection.close();
//   });

// Tweet
//   .findByIdAndDelete('5cb61af5d0b1eb18fb751792')
//   .then(result => console.log(result))
//   .finally(() =>  mongoose.connection.close());

