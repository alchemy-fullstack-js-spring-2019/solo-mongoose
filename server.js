require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

// MAKE .ENV
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true
});


const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});


