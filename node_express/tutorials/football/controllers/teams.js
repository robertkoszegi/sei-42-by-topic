let Team = require("../model/team");

function index(req, res) {
  res.render("teams/index", {
    teams: Team.showAll(),
  });
}

function show(req, res) {
  res.render("teams/show", {
    team: Team.showOne(req.params.id),
  });
}

function create(req, res) {
  Team.addOne(req.body);
  res.redirect("/teams");
}

function deleteTeam(req, res) {
  Team.deleteOne(req.params.id);
  res.redirect("/teams");
}

function update(req, res) {
  Team.updateOne(req.params.id, req.body);
  res.redirect(`/teams/${req.params.id}`);
}

module.exports = {
  index,
  show,
  create,
  delete: deleteTeam,
  update,
};
