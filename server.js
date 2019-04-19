require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true
});

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

