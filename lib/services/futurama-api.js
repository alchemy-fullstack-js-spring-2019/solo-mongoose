const request = require('superagent');

function futuramaQuote() {
  return request
    .get('http://futuramaapi.herokuapp.com/api/quotes/1')
    .then(result => {
      return result.body[0].quote;
    });
}

const randomQuote = futuramaQuote();

console.log(randomQuote);

module.exports = futuramaQuote;
