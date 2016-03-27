import assert from 'assert';

import Store from '../src/store.js';

describe('SQLite store test', () => {
    it('should return 6 rows', async (done) => {
        const store = new Store();
        const data = await store.getSensorIds();
        assert.equal(6, data.length);
        done();
    });
});