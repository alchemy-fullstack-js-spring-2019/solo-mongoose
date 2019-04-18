require('dotenv').config();
const app = require('./lib/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 2309;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
