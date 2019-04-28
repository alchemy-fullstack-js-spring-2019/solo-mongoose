const getQuote = require('../services/futuramaQuoteApi');

module.exports = (req, res, next) => {
  if(req.query.random === 'true') {
    getQuote()
      .then(quote => {
        req.body.body = quote;
        next();
      });
  }
  else {
    next();
  }
};
