const { v4: uuidv4 } = require("uuid");

const teams = [
  { id: uuidv4(), name: "Manchester United", color: "#DA291C" },
  { id: uuidv4(), name: "Tottenham Hotspurs", color: "#132257" },
  { id: uuidv4(), name: "Burnley", color: "#6C1D45" },
  { id: uuidv4(), name: "Chelsea", color: "#034694" },
  { id: uuidv4(), name: "Wolverhampton Wanderers", color: "#FDB913" },
];

function showAll() {
  return teams;
}

function showOne(id) {
  return teams.find((team) => id === team.id);
}

function addOne(team) {
  console.log("Add one", team);
  team.id = uuidv4();
  teams.push(team);
}

function deleteOne(id) {
  let idx = teams.findIndex((team) => id === team.id);
  teams.splice(idx, 1);
}

function updateOne(id, team) {
  let updateTeam = teams.find((team) => id === team.id);
  updateTeam.name = team.name;
}

module.exports = {
  showAll,
  showOne,
  addOne,
  deleteOne,
  updateOne,
};
