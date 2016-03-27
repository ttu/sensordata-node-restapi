import http from 'http';
import assert from 'assert';

import '../src/app.js';

describe('API test', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:1337/api/', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return 401', done => {
    http.get('http://127.0.0.1:1337/api/sensors', res => {
      assert.equal(401, res.statusCode);
      done();
    });
  });
});