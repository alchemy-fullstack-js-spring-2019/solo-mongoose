require('dotenv').config;

const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/tweets', {  //(PROCESS.ENV.mongodb_uri, {......
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(7890, () => {
  console.log('Started on port 7890');
});
