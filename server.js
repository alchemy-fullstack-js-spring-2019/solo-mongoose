const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

mongoose.connect('mongodb://localhost:27017/dogs', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

/*eslint-disable-next-line no-unused-vars*/
app.use((err, req, res, next) => {
  req.statusCode(500).send({ error: err });
});

app.listen(PORT, () => {
  /*eslint-disable-next-line*/
  console.log(`Started on port ${PORT}`);
});
