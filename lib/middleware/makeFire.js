module.exports = (req, res, next) => {
    const emojiSmile = Buffer.from([[0xF0, 0x9F, 0x98, 0x81]]);
    res.on('finish', () => {
       if(`${req.method}` === 'GET')
           console.log(emojiSmile.toString());
           res.send(emojiSmile.toString());
   })
    next();
}
