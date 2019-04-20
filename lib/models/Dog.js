const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  favoriteFood: {
    type: String
  },
  age: {
    type: Number,
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
