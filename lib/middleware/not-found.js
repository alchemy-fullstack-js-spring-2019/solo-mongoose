module.exports = (err, req, res, next) => {
  res.status = 404;
  res.send('404 Not Found');
};
