const app = require('./lib/app.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Tweets', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(3355, () => {
  console.log('listening on port 3355');
});
