const mongoose = require('mongoose');
const app = require('./lib/app');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// mongoose.connect('mongodb://localhost:27017/story', {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
    console.log(`client connected on port ${PORT}`);
});
