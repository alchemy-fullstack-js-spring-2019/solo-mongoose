const mongoose = require('mongoose');
const app = require('./lib/app');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {

  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

const PORT = process.env.PORT || 7899;

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
