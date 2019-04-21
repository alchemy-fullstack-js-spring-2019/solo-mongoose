
module.exports = (req, res) => {
  const startAt = Date.now();
  res.on('finish', () => {
    const timeElapsed = Date.now() - startAt;
    console.log(`[${req.method}][${req.baseUrl}][${res.statusCode}] -${timeElapsed}ms`);
  });
};
