const futuramaQuote = require('../services/futurama-api');

module.exports = (req, res, next) => {
  if(req.query.random) {
    return futuramaQuote()
      .then(result => {
        req.body.body = result;
        next();
      });
  }
  next();
};
