const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) =>  {
  getQuote()
    .then(quote => {
      req.body = quote;
      next();
    })
    .catch(next);
};
