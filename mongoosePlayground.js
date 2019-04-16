const mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/tweets', { 
    useNewUrlParser: true,
    useFindAndModify: false
});

// create tweet schema
const tweetSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true
    },
    body: {
        type: String,
        minLength: 10,
        maxLength: 256
    },
    tag: {
        type: String,
        required: true,
        enum: ['person', 'dog']
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    retweets: {
        type: [String]
    }
});

// create tweet model
const Tweet = mongoose.model('Tweet', tweetSchema);

// create a new tweet
Tweet
    .create({ 
        handle: 'bonnie', 
        text: 'tweet number one',
        tag: 'person'
    })
    .then(createdTweet => console.log(createdTweet));

Tweet.findById('5cb61a294a06fd765d8bcb19')
    .then(foundTweet => console.log('\nfound:\n', foundTweet));

Tweet.findByIdAndUpdate('5cb61a294a06fd765d8bcb19', { text: 'updated again' })
    .then(updatedTweet => console.log('\nupdated tweet:\n', updatedTweet))
    .finally(() => {
        mongoose.connection.close();
    });


