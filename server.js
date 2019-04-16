require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const PORT = process.env.PORT || 7890;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
