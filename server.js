const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

mongoose.connect('mongodb://127.0.0.1:27017/fweet', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
