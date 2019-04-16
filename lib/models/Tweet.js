const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
  handle : {
    type: String,
    required: true
  },
  text : {
    type: String,
    required: true
  }
});
  

module.exports = tweetsSchema;
