module.exports = (req, res, next) => {
  const starAt = Date.now();
  res.on('finish', () => {
    const totalTime = Date.now() - starAt;
    console.log(`${req.method} ${req.baseUrl} ${req.statusCode} -- ${totalTime}`);
  });
  next();
};
