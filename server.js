const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/users', { 
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(7890, () => {
  console.log('server online');
});
