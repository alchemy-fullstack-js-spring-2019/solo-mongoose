const mongoose = require('mongoose');
const app = require('./lib/app');

const SERVER_PORT = 7890;

mongoose.connect('mongodb://localhost:27107', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('started on port', SERVER_PORT);
});

