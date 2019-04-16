const express = require('express');
const app = express();
const createdTweet = require('../lib/routes/tweet');

app.use(express.json());
app.use('/tweets', require('../lib/routes/tweet.js'));

// app.get('/', (req, res) => {
//     res.send('Hello Nerds');
// });

module.exports = app;
