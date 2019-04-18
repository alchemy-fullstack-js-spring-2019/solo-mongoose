const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
  return getQuote()
    .then(quoteObj => {
      req.quote = quoteObj[0].quote;
      console.log(res.quote);
      next();
    });
};
