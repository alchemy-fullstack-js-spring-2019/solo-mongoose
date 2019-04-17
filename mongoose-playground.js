// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/tweets', {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });

// const tweetSchema = new mongoose.Schema({
//     handle: {
//         type: String,
//         required: true
//     },
//     body: {
//         type: String,
//         required: true
//     }
// });

// const Tweet = mongoose.model('Tweet', tweetSchema);

// Tweet.create({ handle: 'Colin', body: 'Mongoose stuffs?'})
//     .then(tweet => console.log(tweet))
//     .finally(() => mongoose.connection.close());

// Tweet
//     .find()
//     .then(foundTweet => console.log(foundTweet))
//     .finally(() => mongoose.connection.close())

// Tweet
//     .create({ handle: 'New Guy', body: 'Lets do this'})
//     .then(createdTweet => {
//         console.log('LOOK AT THIS', createdTweet);
//         return Tweet.findById(createdTweet._id)
//     })
//     .then(foundTweet => {
//         console.log('this is found tweet', foundTweet);
//     })
//     .finally(() => mongoose.connection.close());

// Tweet
//     .create({ handle: 'Squirrel', body: 'more text'})
//     .then(createdTweet => {
//         return Tweet.findByIdAndUpdate(createdTweet.id, { handle: 'Octopus'})
//     })
//     .then(updatedTweet => console.log(updatedTweet));

// Tweet
//     .findByIdAndUpdate("5cb6278b6a54fd330451c6a0", { handle: 'UPDATED', body: 'yet more updates'}, { new: true})
//     .then(updatedTweet => console.log(updatedTweet))
//     .finally(() => {
//         mongoose.connection.close();
//     });
