const mongoose = require('mongoose');
const app = require('./lib/app.js');


mongoose.connect('mongodb://127.9.9.1:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`Someone connected on port ${PORT}!`);
});
