const mongoose = require('mongoose');

const dogsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    max: 19
  }
});

const Dog = mongoose.model('Dog', dogsSchema);

module.exports = Dog;
