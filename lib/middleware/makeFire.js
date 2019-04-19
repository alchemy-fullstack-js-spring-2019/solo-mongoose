// module.exports = (req, res, next) => {
//     const emojiSmile = Buffer.from([[0xF0, 0x9F, 0x98, 0x81]]);
//     res.on('finish', () => {
//         console.log('logging makeFire middleware');
//         console.log(`${req.method}`);
//        if(`${req.method}`)
//            console.log(emojiSmile.toString());
//            res.send(emojiSmile.toString());
//    })
//     next();
// }

const emojiSmile = Buffer.from([[0xF0, 0x9F, 0x98, 0x81]]);
console.log(emojiSmile.toString());
