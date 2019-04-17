const app = require('./lib/app.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Tweets', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const PORT = process.env.PORT || 3355;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
