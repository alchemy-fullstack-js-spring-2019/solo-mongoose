require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Started port on ${PORT}`);
});
