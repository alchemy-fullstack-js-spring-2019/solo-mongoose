const express = require('express');
const app = express();

app.use(express.json());

app.use('/tweets', require('./routes/tweets'));

// eslint-disable-next-line no-unused-vars
app.use(require('./middleware/not-found'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next)=>{
    res.staus(500).send({ error: err });
});

module.exports = app;


//not found middleware
//error handling middleware
