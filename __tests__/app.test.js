const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Resource = require('../lib/models/resource.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testObj = {
    category: 'interesting',
    title: 'the lightning algorithm',
    description: 'simulating the unpredictablility lightning with an algorithm',
    url: 'https://www.youtube.com/watch?v=akZ8JJ4gGLs',
  };

  const updatedObj = {
    ...testObj,
    title: 'Test is working',
  };

  it('should create a resource', async () => {
    const res = await request(app).post('/resources').send(testObj);

    expect(res.body).toEqual({ id: expect.any(String), ...testObj });
  });

  it('should get all resources', async () => {
    await Resource.insert(testObj);

    const res = await request(app).get('/resources');
    expect(res.body).toEqual([{ id: expect.any(String), ...testObj }]);
  });

  it('should get a resource by id', async () => {
    const resource = await Resource.insert(testObj);

    const res = await request(app).get(`/resources/${resource.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...testObj });
  });

  it('should update a resource', async () => {
    const resource = await Resource.insert(testObj);

    const res = await request(app)
      .patch(`/resources/${resource.id}`)
      .send(updatedObj);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...updatedObj,
    });

    expect(await Resource.getById(resource.id)).toEqual({
      id: expect.any(String),
      ...updatedObj,
    });
  });

  it('should be able to delete a resource', async () => {
    const resource = await Resource.insert(testObj);

    const res = await request(app).delete(`/resources/${resource.id}`);

    expect(res.body).toEqual({ id: expect.any(String), ...testObj });

    expect(await Resource.getById(resource.id)).toBeNull();
  });
});
