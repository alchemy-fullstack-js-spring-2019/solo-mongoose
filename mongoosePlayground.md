const mongoose = require('mongoose');

//connects to mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/tweets', {
    useNewUrlParser: true
});

const tweetsSchema = new mongoose.Schema({    
    handle: {
        type: String,
        required: true  //here, the handle is required but the body is not. Will fail if no handle
    },
    body: {   
        type: String,   
        minLength: 20,   //will fail if not within these params
        maxLength: 260
    },
    tag: {
        type: String,
        enum: ['person', 'dog']  //these are the only acceptable tags
    },
    likes: {
        type: Number,
        required: true,
        default: 0,   //if not provided, defaults to 0 rather than failing
        min: 0
    },
    retweets: {
        type: [String] //denotes an array of strings
    },
    address: {   //can have a field that is an object (nested)  -- you want to nest as little as possible. only nest if you have a good reason to
        street: String,
        zipcode: String,
        city: String
    }
});

const Tweet = mongoose.model('Tweet', tweetsSchema);   //creating a tweet model by saying what it should be called and what schema is should use

// Tweet
//     .create({ handle: 'ryan', body: 'my first tweet' })
//     .then(createdTweet => {
//         return Tweet.findById(createdTweet._id);
//     })
//     .then(foundTweet => console.log(foundTweet));
//     .finally(() => {
//         mongoose.connection.close();     //ends your interaction (before this, you were having to ctrl c in the terminal to be able to enter new stuff)
//     });

// Tweet
//     .find()
//     .then(tweets => console.log(tweets));
//     .finally(() => {
//         mongoose.connection.close();     //ends your interaction (before this, you were having to ctrl c in the terminal to be able to enter new stuff)
//     });

// Tweet
//     .findById('5cb61a65696e02546e1c587e')
//     .then(foundTweet => console.log(foundTweet))
//     .finally(() => {
//         mongoose.connection.close();     //ends your interaction (before this, you were having to ctrl c in the terminal to be able to enter new stuff)
//     });

// Tweet
//     .findByIdAndUpdate('5cb61a65696e02546e1c587e', { handle: 'spot' }, { new: true })
//     .then(updatedTweet => console.log(updatedTweet))
//     .finally(() => {
//         mongoose.connection.close(); 
//     });

// Tweet
//     .create({ handle: 'anna', body: 'tweet to update' })
//     .then(createdTweet => {
//         return Tweet.findByIdAndUpdate(createdTweet._id, { body: 'updated' }, { new: true });
//     })
//     .then(updatedTweet => console.log(updatedTweet))
//     .finally(() => {
//         mongoose.connection.close(); 
//     });

Tweet
    .findByIdAndDelete('5cb619f3371ca5541a6fc4ef')
    .then(deleted => console.log(deleted))
    .finally(() => {
        mongoose.connection.close();
    });
