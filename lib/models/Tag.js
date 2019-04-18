const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    match: /#[\w-]+$/,
    trim: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
