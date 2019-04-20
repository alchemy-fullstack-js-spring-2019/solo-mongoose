module.exports = (error, req, res, next) => {
  res.status(500);
  res.send({ error: 'Internal Server Error' });
};
