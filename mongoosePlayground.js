const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tweets', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});


const Tweet = mongoose.model('Tweet', tweetSchema);

//***********CREATE TWEET********** */
// Tweet 
//   .create({ handle: 'TEST', text: 'ROBO CAN YOU SEE ME'})
//   .then(console.log);


//**************FIND BY ID********** */
// Tweet
//   .create({handle: 'FIND', text: 'FIND MY TWEET'})
//   .then(tweetToFind=>{
//     return Tweet.findById(tweetToFind._id)
//   })
//   .then(console.log);


//**************UPDATe  MODEL******** */

Tweet
  .create({handle: ''})



