const getQuote = require('../services/getQuote');

module.export = (req, res, next) => {
    return getQuote()
        .then(quoteObj => {
            // const firstQuote = quoteObj[0];
            // req.quote = firstQuote.quote;
            req.body.quote = quoteObj;
            next();
        })
        .catch(next);
};
