const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    maxLength: 256
  }//,
  // left off here thurs 9:34a, using the email string as the _id field
  // & add a virtual field named "email" that returned the _id
  // id: {
  //   type: mongoose.Types.ObjectId, 
  //   ref: 'User'._id,
  //   required: true
  // }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
