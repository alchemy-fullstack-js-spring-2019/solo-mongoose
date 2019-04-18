/*eslint-disable*/

module.exports = (req, res, next) => {
    console.log('never run');
    res.status(404).send({ error: 'Not Found' });
  };
  