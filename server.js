require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
