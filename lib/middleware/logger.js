module.exports = (req, res, next)=> {
  const startAt = Date.now();
  res.on('finish', ()=> {
    const totalTime = Date.now() - startAt;
    console.log(`[${req.method}]${req.baseUrl} [${res.statusCode}] - ${totalTime}ms`);
  });
  next();
};
