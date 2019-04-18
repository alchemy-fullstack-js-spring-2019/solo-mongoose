const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
  return getQuote()
    .then(quoteObj => {
      console.log('quote object', quoteObj);
      req.quote = quoteObj[0].quote;
      next();
    });
};
