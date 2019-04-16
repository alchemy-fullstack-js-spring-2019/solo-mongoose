const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ninjas', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});
