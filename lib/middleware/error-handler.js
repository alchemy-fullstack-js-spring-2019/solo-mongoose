//eslint-disable-next-line
module.exports = (error, req, res, next) => {
  res.status(500).send({ error });
};
