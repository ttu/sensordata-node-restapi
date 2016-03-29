import assert from 'assert';

import Store from '../src/store.js';

// http://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/
var wrap = fn => {
    return async (done) => {
        try {
            await fn();
            done();
        } catch (err) {
            done(err);
        }
    };
};

describe('SQLite store test', () => {
    it('should get row count', wrap(async () => {
        const store = new Store();
        const count = await store.getCount();
        console.log(count);
        assert.equal(256301, count);
    }));
    
    it('should return 6 rows', wrap(async () => {
        const store = new Store();
        const data = await store.getSensorIds();
        assert.equal(6, data.length);
    }));
    
    it('should return all data count with promises', (done) => {
        const store = new Store();
        return store.getCount().then(count => {
            return store.getAllData(count, 0).then(data => {
                assert.equal(count, data.length);
                done();
            });
        });
    });

    it('should return all data count with async', wrap(async () => {
        const store = new Store();
        const count = await store.getCount();
        const data = await store.getAllData(count, 0);
        assert.equal(count, data.length);
    }));
    
    it('should return status for 6 sensors', wrap(async () => {
        const store = new Store();
        const data = await store.getSensorStatuses();
        assert.equal(6, data.length);
    }));
});