const Movie = require("../models/movie");
const Performer = require("../models/performer");

module.exports = {
  index,
  show,
  new: newMovie,
  create,
};

function index(req, res) {
  Movie.find({}, function (err, movies) {
    res.render("movies/index", { title: "All Movies", movies });
  });
}

async function show(req, res) {
  // Movie.findById(req.params.id, function (err, movie) {
  //   res.render("movies/show", { title: "Movie Detail", movie });
  // });
  try {
    let movie = await Movie.findById(req.params.id).populate("cast");
    console.log(movie);
    let notInMoviePerformers = await Performer.find({
      _id: { $nin: movie.cast },
    });
    // console.log(notInMoviePerformers);
    res.render("movies/show", {
      title: "Movie Detials",
      movie,
      performers: notInMoviePerformers,
    });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
}

function newMovie(req, res) {
  res.render("movies/new", { title: "Add Movie" });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const movie = new Movie(req.body);
  movie.save(function (err) {
    if (err) return res.redirect("/movies/new");
    res.redirect(`/movies/${movie._id}`);
  });
}
