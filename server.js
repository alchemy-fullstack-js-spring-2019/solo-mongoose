const mongoose = require('mongoose');
const app = require('./lib/app')
require('dotenv')();



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true
});


const PORT = process.env.PORT || 6666;


app.listen(6666, () => {
  console.log(`Listening on port ${PORT}`)
});


