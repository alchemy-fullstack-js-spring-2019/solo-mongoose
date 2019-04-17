const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
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
//  findByID
Tweet
  .findById('5cb624942a95231dacacfe03')
  .then(result => console.log(result));
//   //Create then find
// Tweet
//   .create({ name: 'Sean', text: 'Hello there!' })
//   .then(created => {
//     return Tweet.findById(created._id);
//   })
//   .then(found => console.log(found));



// Tweet
//   .create({
//     name: 'See',
//     text: 'my first tweet'
//   })
//   .then(created => {
//     return Tweet.findByIdAndUpdate(created._id, { name: 'Me', text: 'actually, my second' }, { new: true })
//   })
//   .then (updated =>  {
//     return Tweet.findByIdAndDelete(updated._id);
//   })
//   .then(result => console.log(result))
//   .finally(() => { mongoose.connection.close();
//   });

// Tweet
//   .findByIdAndDelete('5cb61af5d0b1eb18fb751792')
//   .then(result => console.log(result))
//   .finally(() =>  mongoose.connection.close());

// Tweet
// .findByID('id?')
// .select({
//   body: true/false
//   handle: true/false
// })

// .then(console.log);
