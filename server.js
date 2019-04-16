require('dotenv').config();
const app = require('./lib/app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// const PORT = process.env.PORT || 7890;

app.listen(7890, () => {
    console.log('Listening on port 7890');
});
