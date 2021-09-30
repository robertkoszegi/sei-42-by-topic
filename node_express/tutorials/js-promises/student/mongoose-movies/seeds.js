 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');

//  Movie.deleteMany({})
//  .then(function(results) {
//    console.log('Deleted movies: ', results);
//    return Performer.deleteMany({});
//  })
//  .then(function(results) {
//    console.log('Deleted performers:', results);
//  })
//  .then(function() {
//    process.exit();
//  });

const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});

Promise.all([p1, p2]).then((result)=>{
    console.log("delete promise all --->", result);
    const c1 = Performer.create(data.performers);
    const c2 = Movie.create(data.movies);

    return Promise.all([c1, c2]);
}).then((result) => {
    console.log("create promise all --->", result);
    return Promise.all([
        Performer.findOne({name: 'Mark Hamill'}),
        Movie.findOne({title: 'Star Wars - A New Hope'})
    ]);
}).then((results) => {
    const mark = results[0];
    const starWars = results[1];
    starWars.cast.push(mark);
    return starWars.save();
}).then(() => {
    process.exit();
});