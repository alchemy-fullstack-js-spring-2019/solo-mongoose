const mongoose = require('mongoose');
const Tag = require('../../lib/models/Tag');

describe('Tag model', () => {
  it('creates a tag with a keyword', () => {
    const tag = new Tag({
      keyword: '#hash_tag'
    });

    expect(tag.toJSON()).toEqual({
      keyword: '#hash_tag',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('it trims whitespace', () => {
    const tag = new Tag({
      keyword: ' #hash_tag '
    });

    expect(tag.toJSON()).toEqual({
      keyword: '#hash_tag',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('must match the regex pattern', () => {
    const tag = new Tag({
      keyword: 'hash tag'
    });

    const errors = tag.validateSync().errors;

    expect(errors.keyword.message).toBe('Path `keyword` is invalid (hash tag).');
  });
});
