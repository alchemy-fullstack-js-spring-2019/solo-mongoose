require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`ecouter sur port ${PORT}`);
});

