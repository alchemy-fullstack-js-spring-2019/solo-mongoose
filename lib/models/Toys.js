const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  condition: {
    type: String,
    required: true
  }
});

const Toy = mongoose.model('Toy', toySchema);
module.exports = Toy;
