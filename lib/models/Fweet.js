const mongoose = require('mongoose');

const fweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 140
  }
});

const Fweet = mongoose.model('Fweet', fweetSchema);

module.exports = Fweet;
