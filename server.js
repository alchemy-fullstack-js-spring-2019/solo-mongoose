const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = 7890;

mongoose.connect('mongodb://127.0.0.1:27017/fweet', {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
