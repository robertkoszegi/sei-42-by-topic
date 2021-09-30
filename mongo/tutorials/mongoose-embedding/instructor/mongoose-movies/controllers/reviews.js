const Movie = require("../models/movie");

function create(req, res) {
  //find the movie
  //add the review to the movie
  //save the movie
  //redirect to the movie show page
  Movie.findById(req.params.id, function (err, movie) {
    if (err) console.log(err.message);
    movie.reviews.push(req.body);
    movie.save(function (err) {
      if (err) console.log(err.message);
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

module.exports = {
  create,
};
