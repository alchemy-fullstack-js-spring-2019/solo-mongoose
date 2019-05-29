## mongoosePlayground

### const mongoose = require('mongoose');

### mongoose.connect

### const tweetsSchema 



## lib/models/Tweet.js
const mongoose

const tweetSchema = new mongoose.Schema({
  handle: {
    type: string,
    required: true
  }
  body: {
    type: string,
    required: true
  }
})
const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;


## test/models/Tweet.js

import model into test
describe tweet model
  it has a handle and body field
  const tweet = new Tweet({
      handle:
      body:
  })
  expect(tweet.toJSON).toEqual({
    handle
    body
    _id: expect.any(mongoose.Types.ObjectId)
  })
  it(has a required body field)

RUN THE TEST --- FAILING
