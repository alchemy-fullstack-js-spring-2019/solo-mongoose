const { getFuturamaQuote } = require('../services/futurama-api');

module.exports = (req, res, next) => {
  if(req.query.random) {
    return getFuturamaQuote()
      .then(quote => {
        req.body.body = quote;
        next();
      });
  } else next();
};
