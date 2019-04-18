const request = require('superagent');

module.exports = (req, res, next) =>  {
  request
    .get('http://futuramaapi.herokuapp.com/api/quotes/1')
    .then(res => res.body[0].quote)
    // .then(quote => {
    //   req.body.quote = quote;
    // })
    .catch(next);
};
