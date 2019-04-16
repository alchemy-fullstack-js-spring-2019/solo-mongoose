require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app.js');

const PORT = process.env.PORT || 8888;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`Someone connected on port ${PORT}!`);
});
