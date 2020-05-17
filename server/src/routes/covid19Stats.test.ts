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
  test('Confirm array is returned', async (done) => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
    done();
  });
  test('API Should return Array of Objects', async (done) => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ state: 'AK' }),
        expect.objectContaining({ state: 'AL' }),
        expect.objectContaining({ state: 'AR' }),
      ])
    );
    done();
  });
  test('Check Object has correct properties', async (done) => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(resp.body[0]).toHaveProperty('state');
    expect(resp.body[0]).toHaveProperty('hospitalizedCurrently');
    expect(resp.body[0]).toHaveProperty('total3Days');
    expect(resp.body[0]).toHaveProperty('fips');
    done();
  });
});
