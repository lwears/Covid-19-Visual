import request from 'supertest';
import app from '../index';

describe('The Covid19 Api', () => {
  test('responds with json', (done) => {
    request(app)
      .get('/api/covidstats')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
