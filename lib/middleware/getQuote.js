const futuramaQuote = require('../services/futurama-api');

module.exports = (req, res, next) => {
  if(req.query.random) {
    return futuramaQuote()
      .then(quote => {
        req.body = quote;
        next();
      });
  }
  next();
};
