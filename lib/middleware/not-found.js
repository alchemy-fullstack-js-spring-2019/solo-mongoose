module.exports = (req, res, next) => {
    res.status(404);
    res.send({ error: 'Not Found' });
};
