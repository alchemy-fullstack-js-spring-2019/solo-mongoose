const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
    useNewUrlParser: true,
    useFindAndModify: false
});


mongoose.connect('mongodb://localhost:27017/story', {
    useNewUrlParser: true,
    useFindAndModify: false
});
