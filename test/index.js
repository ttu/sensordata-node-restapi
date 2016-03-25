import http from 'http';
import assert from 'assert';

import '../src/app.js';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:1337', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return data', done => {
    http.get('http://127.0.0.1:1337/data', res => {
      assert.equal(401, res.statusCode);
      done();
    });
  });
});