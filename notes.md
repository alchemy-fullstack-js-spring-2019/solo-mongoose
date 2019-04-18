.find()
.select({
  __v: false     <-- use select to send back a subset of information
})


.get('/', (req, res, next) => {
        Tweet
            .find()
            .lean() <--use if you're just sending info back to the client
            .then(tweets => res.send(tweets))
            .catch(next);
    })


USer
  .create ...
  .then(createdUSer => {
    return Tweet.create({
      user: createdUser._id,
      body: 'my tweet'
    })
  })

Tweet  -return user by tweet id
  .findById()
  .populate('user')

  .populate('user', {
    handle: true
  })
  

