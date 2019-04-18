const User = require('../../lib/models/User');

describe('User model', ()=>{
    it('handle is required', ()=>{
        const user = new User({     
            image: 'placeholder'
        });
        const errors = user.validateSync().errors;
        expect(errors.handle.message).toEqual('Path `handle` is required.');
    });
});

