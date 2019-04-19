const mongoose = require('mongoose');

const dogsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  }
});

const Dog = mongoose.model('Dog', dogsSchema);

module.exports = Dog;
