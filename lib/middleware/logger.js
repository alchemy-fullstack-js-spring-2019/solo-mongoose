module.exports = (req, res, next) => {
  const startAt = Date.now();
  res.on('finish', () => {
    const totalTime = Date.now() - startAt;
    console.log(`[${req.method}] ${req.url} ${req.statusCode} ${totalTime} ms`);
  });
  next(); //pushes us to next piece of middleware
};
