const Movie = require("../models/movie");

// function create(req, res){
//     const newMovie = new Movie({
//         title: "Batman",
//         releaseYear: 1999,
//         mpaaRating: "R",
//         cast: ["somebody", "someoneelse"],
//         nowShowing: true,
//     })
//     newMovie.save();
//   OR
// Movie.create({
//   title: "Batman",
//   releaseYear: 1999,
//   mpaaRating: "R",
//   cast: ["somebody", "someoneelse"],
//   nowShowing: true,
// });
// }
function index(req, res) {
  Movie.find({}, function (err, movies) {
    if (err) console.log(err.message);
    res.render("movies/index", { movies: movies });
  });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ",");
  if (req.body.cast) req.body.cast = req.body.cast.split(",");

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }

  const movie = new Movie(req.body);
  movie.save(function (err) {
    if (err) {
      console.log(err.message);
      return res.render("movies/new");
    }
    console.log(movie);
    res.redirect("/movies");
  });
}

function newMovie(req, res) {
  res.render("movies/new.ejs");
}

module.exports = {
  new: newMovie,
  create,
  index,
};
