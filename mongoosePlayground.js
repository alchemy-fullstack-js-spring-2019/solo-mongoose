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
    required: true
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

Tweet
  .create({ handle: 'Mal', body: 'tweetin' })
  .then(createdTweet => console.log(createdTweet));

  Tweet
    .find()
    .then(tweets => console.log('******', tweets));

  Tweet
    .create({ handle: 'Mal', body: 'tweetin' })
    .then(createdTweet => {
      return Tweet.findById(createdTweet._id)
    })
    .then(foundTweet => 
      console.log(foundTweet));

    Tweet
      .findByIdAndUpdate('5cb626ec23f5e86076d4fecd', { handle: 'Ash' }, { new: true })
      .then(updatedTweet => console.log(updatedTweet))

    Tweet
      .findByIdAndDelete('5cb626ec23f5e86076d4fecd')
      .then(result => console.log(result));
  
    Tweet
    .findByIdAndDelete('5cb62485a8a4a85f69bc538d')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb6256f6c52e15fa10dbe9b')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb625d38d72f35fdf5ff125')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb6269cbb5169606a32abbb')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb626ec23f5e86076d4fecc')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb63ec62348d261634d1992')
    .then(result => console.log(result));

    Tweet
    .findByIdAndDelete('5cb63ec62348d261634d1993')
    .then(result => console.log(result));
    
    Tweet
    .findByIdAndDelete('55cb63f381eab87617abdf30a')
    .then(result => console.log(result));
    Tweet
    .findByIdAndDelete('5cb640be7ac16861ff0a9bcb')
    .then(result => console.log(result));
    Tweet
    .findByIdAndDelete('5cb640be7ac16861ff0a9bcc')
    .then(result => console.log(result));
