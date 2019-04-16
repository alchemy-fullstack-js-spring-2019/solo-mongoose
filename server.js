require('dotenv').config();
const mongoose = require('mongoose');
const { app } = require('./lib/app');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const PORT = process.env.PORT || 7890;

app.listen(PORT, ()=> {
  console.log(`server started on port ${PORT}`);
});
