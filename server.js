const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://127.0.0.1:27017/dogs', { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(8888, () => {
  console.log('Server started :8888');
});
