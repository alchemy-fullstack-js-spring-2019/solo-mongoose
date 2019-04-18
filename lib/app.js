const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/fweet', require('./routes/fweets'));
app.use('/user', require('./routes/user'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error-handler'));

module.exports = app;
