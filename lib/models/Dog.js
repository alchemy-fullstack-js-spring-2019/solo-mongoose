const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dogs', { useNewUrlParser: true });

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
