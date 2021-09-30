const faker = require('faker');
const db = require('../config/db');
const Puppy = require('../models/puppy');

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

const main = async () => {
  const puppies = [...Array(40)].map((pup) => ({
    name: faker.name.firstName(),
    breed: getRandomBreed(),
    age: getRandomAge(),
  }));

  await Puppy.insertMany(puppies);
  console.log('Created some pups!');
};

const run = async () => {
  await main();
  db.close();
};

run();
