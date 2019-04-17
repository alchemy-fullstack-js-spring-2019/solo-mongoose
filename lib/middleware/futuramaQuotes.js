const request = require('superagent');

function getFuturamaQuote(req, res, next) {
    return request
        .get('http://futuramaapi.herokuapp.com/api/quotes/1')
        .then(quoteObj => {
            const firstQuote = quoteObj[0];
            req.quote = firstQuote;
            next()
        });
};

module.exports = getFuturamaQuote;
