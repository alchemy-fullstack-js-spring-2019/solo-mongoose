module.exports = (req, res, next) => {
    const startDate = Date.now();
    res.on('finish', () => {
        const totalTime = Date.now() - startDate;
        console.log(`[${req.method}], [${res.statusCode}], ${req.baseUrl} ---${totalTime}ms`);
    });
    next();
};
