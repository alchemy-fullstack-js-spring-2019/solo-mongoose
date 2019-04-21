const app = require('./lib/app.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  //these all have to do with the warnings
  //about how mongoose interfaces with the OS  
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(2020, () => {
  console.log('You are listening to smooooth jazz on 2020');
});
