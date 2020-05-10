import request from 'supertest';
import app from '../index';

describe('The Covid19 Api', () => {
  test('API Should return Array of Objects', async () => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ state: 'AK' }),
        expect.objectContaining({ state: 'AL' }),
        expect.objectContaining({ state: 'AR' }),
      ])
    );
  });
  test('Confirm array is returned', async () => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
  });
  test('get one user', async () => {
    const resp = await request(app).get('/api/covidstats');
    expect(resp.status).toBe(200);
    expect(resp.body[0]).toHaveProperty('state');
    expect(resp.body[0]).toHaveProperty('hospitalizedCurrently');
    expect(resp.body[0]).toHaveProperty('total3Days');
  });
});
