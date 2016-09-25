import assert from 'assert';
import request from 'supertest';

import config from  '../src/config'
import app from '../src/app.js';

describe('API test', () => {
  it('should return 200', done => {
    request(app)
      .get('/api/sensors')
      .set('Accept', 'application/json')
      .auth(config.loginUser, config.loginPassword)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return 401', done => {
    request(app)
      .get('/api/sensors')
      .set('Accept', 'application/json')
      .expect(401, done);
  });
});