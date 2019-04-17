const request = require('superagent');

function getFuturamaQuote() {
  return request
    .get('http://futuramaapi.herokuapp.com/api/quotes/1')
    .then(res => {
      return res.body[0].quote;
    });
}

module.exports = { 
  getFuturamaQuote 
};
