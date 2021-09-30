const request = require('supertest');
const server = require('../server');
const faker = require('faker');
const Puppy = require('../models/puppy');
const db = require('../config/database');

const breeds = [
  'Chocolate Lab',
  'Pitbull',
  'Poodle',
  'Golden Retriever',
  'Doberman',
  'Pomeranian',
  'German Shepherd',
];

const getRandomBreed = () => breeds[Math.floor(Math.random() * breeds.length)];
const getRandomAge = () => Math.ceil(Math.random() * 16);

beforeAll(async () => {
  // mongoose.connect('mongodb://localhost/puppiestest', {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  // });

  const puppies = [...Array(20)].map((pup) => ({
    name: faker.name.firstName(),
    breed: getRandomBreed(),
    age: getRandomAge(),
  }));

  await Puppy.insertMany(puppies);
});

describe('Puppies API', () => {
  let puppy;

  it('should show all puppies', async (done) => {
    const res = await request(server).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body).toHaveLength(20);
    done();
  });

  it('should create a new puppy', async (done) => {
    const res = await request(server).post('/api/puppies').send({
      name: faker.name.firstName(),
      breed: getRandomBreed(),
      age: getRandomAge(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    puppy = res.body._id;
    done();
  });

  it('should show a puppy', async (done) => {
    // could write a puppy to the DB
    const res = await request(server).get(`/api/puppies/${puppy}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(puppy);
    done();
  });

  it('should update a puppy', async (done) => {
    const res = await request(server).put(`/api/puppies/${puppy}`).send({
      name: 'Bill',
      age: 10,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Bill');
    expect(res.body.age).toBe(10);
    done();
  });

  it('should delete a puppy', async (done) => {
    const res = await request(server).del(`/api/puppies/${puppy}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(puppy);
    done();
  });
});

afterAll(async () => {
  await Puppy.deleteMany({}); // clean out db
  await db.close(); // close db connection after tests run
});
