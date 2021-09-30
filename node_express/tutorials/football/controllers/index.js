function index(req, res, next) {
  res.render("index", { title: "Football App" });
}

module.exports = {
  index,
};
