const mongoose = require('mongoose');
const User = require('./lib/models/User');
const Tweet = require('./lib/models/Tweet');

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/twitter_clone1', { 
  useNewUrlParser: true,
  useFindAndModify: false
});

User
  .create({
    handle: 'bonnie',
    image: 'https://via.placeholder.com/250'
  })
  .then(createdUser => {
    console.log('Created user', createdUser);
    return createdUser;
  })
  .then(createdUser => {
    return Tweet.create({
      // associate user with tweet
      user: createdUser._id,
      body: 'my first tweet'
    });
  })
  .then(tweet => {
    console.log('tweet', tweet);
  });
 
User
  .findById('5cb7926ae27478d4a4ed8625')
  .then(res => console.log('find user', res));

      





