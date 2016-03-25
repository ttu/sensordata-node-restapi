import assert from 'assert';

import Store from '../src/store.js';

describe('SQLite store test', () => {
    it('should return 1 row', async (done) => {
        const store = new Store();
        const data = await store.get();
        console.log(data);
        assert.equal(1, data.length);
        done();
    });
});