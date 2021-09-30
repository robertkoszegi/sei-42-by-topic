require('./config/database');// connect this script to the database
const Movie = require('./models/movie');
// EXAMPLE 1: ordering asynchronous functions using CALLBACKS
Movie.deleteMany({}, function(err,result) {
    Movie.create( {title: "titanic"}, function(err, result) {
        Movie.create({title: "godzilla"}, function(err, result) {
            console.log("done")
        })
    })
})

// EXAMPLE 2: ordering async functions using ASYNC/AWAIT
// mongoose async functions, in the background, return a promise
//     that is either a "resolved promise" or a "rejected promise"
// await waits until the asynchronous function resolves/rejects the promise
// NOTES: (1) await must be inside a function. (2) function must have the word 'async'
async function doStuff() {
    let result1 = await Movie.deleteMany({}) // wait for promise
    let result2 = await Movie.create({title:"Frozen"})
    let result3 = await Movie.create({title:"Frozen 2"})
}
doStuff()
console.log("done")

// EXAMPLE 3: ordering async functions using ?
Movie.deleteMany({})
.then(function(deleteResult) {
    return Movie.create({title: "The Grinch"})
})
.then(function(createResult) {
    Movie.create({title: "Joker"})
})
.then(function(create2Result) {
    console.log("done")
})