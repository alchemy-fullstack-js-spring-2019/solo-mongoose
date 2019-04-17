const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweet', require('./routes/tweet'));
app.use('/user', require('./routes/user'));

app.use(require('./middleware/not-found'));

app.use(require('./middleware/error'));

module.exports = app;
