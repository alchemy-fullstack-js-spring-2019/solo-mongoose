const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        maxlength: 300
    },
    date: {
        type: Number,
        required: false
    },
    body: {
        type: String,
        required: true,
        minlength: 15
    },
    tags: {
        type: [ String ],
        required: false
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
