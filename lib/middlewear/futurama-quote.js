const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
  return getQuote()
    .then(quotesObj => {
      const firstQuote = quotesObj[0];
      req.quote = firstQuote.quote;
      next();
    });
};
