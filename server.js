require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log('ch\'u b\'en trouvez!');
});

const PORT = process.env.PORT || 7890;
