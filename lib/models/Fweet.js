const mongoose = require('mongoose');

const fweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 140
  },
  tags: {
    type: String,
    enum: ['code', 'JavaScript', 'alchemy', 'JS'],
    required: false
  }
});

const Fweet = mongoose.model('Fweet', fweetSchema);

module.exports = Fweet;
