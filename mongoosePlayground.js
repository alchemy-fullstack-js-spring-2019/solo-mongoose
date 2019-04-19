const mongoose = require('mongoose');
const Tweet = require('./lib/models/Tweet');
const Dog = require('./lib/models/Dog');

mongoose.connect('mongodb://localhost:27017/myFirstDb', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Dog
//   .create({
//     name: 'bingo',
//     handle: 'hello',
//     email: 'bingo@hello.com'
//   })
//   .then(createdDog => {
//     return Tweet.create({
//       user: createdDog._id,
//       body: 'tweet tweet'
//     });
//   })
//   .then(console.log);

Tweet
  .findById('5cb78e5d398b4dc68f77e6c6')
  .populate('user', {
    __v: false
  })
  .select({
    __v: false
  })
  .lean()
  .then(console.log)
  .finally(() => mongoose.connection.close());


