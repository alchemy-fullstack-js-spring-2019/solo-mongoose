// const mongoose = require('mongoose');
// const User = require('../../lib/models/User');

// describe('user model', () => {
//   it('has handle, name and email fields', () => {
//     const user = new User({
//       handle: 'hot_stuff',
//       name: 'jessy',
//       email: 'smile@email.net'
//     });

//     expect(user.toJSON()).toEqual({
//       handle: 'hot_stuff',
//       name: 'jessy',
//       email: 'smile@email.net',
//       _id: expect.any(mongoose.Types.ObjectId)
//     });
//   });

//   it('has a required handle', () => {
//     const user = new User({ name: 'dave', email: 'something@email.com' });
//     const errors = user.validateSync().errors;
//     expect(errors.handle.message).toEqual('Path `handle` is required.');
//   });

//   it('has required name', () => {
//     const user = new User({ handle: 'elly_belly', email: 'whips@you.now' });
//     const errors = user.validateSync().errors;
//     expect(errors.name.message).toEqual('Path `name` is required.');
//   }); 

//   it('has required email', () => {
//     const user = new User({ handle: 'elly_belly', name: 'daddy' });
//     const errors = user.validateSync().errors;
//     expect(errors.email.message).toEqual('Path `email` is required.');
//   }); 
// });
