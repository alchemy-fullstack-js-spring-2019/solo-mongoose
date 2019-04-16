const mongoose = require('mongoose');
const Story = require('../../lib/models/Story');

describe('story schema test', () => {
    it('has a required body', () => {
        const story = new Story({
            author: 'Me',
            date: 1220,
            tags: ['cats', 'dingos']
        });

        const errors = story.validateSync().errors;
        expect(errors.body.message).toEqual('Path `body` is required.')
    });
});
