const mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect('mongobd://localhost:27017/tweets', { useNewUrlParser: true });

// create tweet schema
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

// create tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);

// create a new tweet
Tweet
    .create({ 
        handle: 'bonnie', 
        text: 'my first tweet'
    })
    .then(createdTweet => console.log(createdTweet));


