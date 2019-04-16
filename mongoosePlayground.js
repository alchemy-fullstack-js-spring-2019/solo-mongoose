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
        handle: 'leland', 
        body: 'tweet number one',
        tag: 'person'
    })
    .then(createdTweet => console.log('\ncreated tweet:\n', createdTweet));

Tweet.findById('5cb61c57014b01778d4708dd"')
    .then(foundTweet => console.log('\nfound:\n', foundTweet));

Tweet.findByIdAndUpdate('5cb620cd79389a7943a8acdd', { body: 'updated once again' })
    .then(updatedTweet => console.log('\nupdated tweet:\n', updatedTweet));

Tweet.findByIdAndDelete('5cb621bef4f17379b6914624')
    .then(res => console.log('deleted --', res))
    .finally(() => {
        mongoose.connection.close();
    });


