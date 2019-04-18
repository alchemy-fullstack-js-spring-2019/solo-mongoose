const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
  const url = req.url;
  if(url.pathname === '?random=true'){
    return getQuote()
      .then(quoteObj => {
        req.quote = quoteObj.quote;
        next();
      });
  } else next();
};
