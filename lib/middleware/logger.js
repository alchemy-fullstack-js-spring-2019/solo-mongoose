module.exports = (req, res, next) => {
  const startAt = Date.now();
  res.once('finish', () => {
    console.log(req.method, req.baseUrl, `[${res.statusCode}]`, `- ${(Date.now()) - startAt}ms`);
  });
  next();
};
