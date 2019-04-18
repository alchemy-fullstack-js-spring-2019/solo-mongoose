/*eslint-disable*/
const HttpError = require('./HttpError');

module.exports = (err, req, res, next) => {
  if(err instanceof HttpError) {
    res.status(err.code).send({ error: err.message });
  } else
  if(err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ error: err.message });
  } else
  if(process.env.NODE_ENV !== 'production') {
    console.log(err);
    res.send({ error: err.message });
  } else {
    res.status(500).send({ error: `Internal Server Error: ${err}` });
  }
};
