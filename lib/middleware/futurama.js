const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
  console.log('getting quote?');

  return getQuote()
    .then(quoteObj => {
      req.quote = quoteObj[0].quote;
      console.log(req.quote);
      next();
    });
};
