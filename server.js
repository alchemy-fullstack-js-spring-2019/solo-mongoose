require('dotenv').config();
const app = require('./lib/app.js');
const mongoose = require('mongoose');


//MAKE .ENV
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const PORT = process.env.PORT || 3355;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
