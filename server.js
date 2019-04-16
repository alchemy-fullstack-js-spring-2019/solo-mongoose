const mongoose = require('mongoose');
const { app } = require('./lib/app');


mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(7890, ()=> {
  console.log('server started on port 7890');
});
