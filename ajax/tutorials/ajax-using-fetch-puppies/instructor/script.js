const BASE_URL = "https://sei-puppies-api.herokuapp.com/api/puppies/";

const indexViewEl = document.getElementById("index-view");
const listContainerEl = document.querySelector("#index-view section");
const createBtn = document.getElementById("create-view-btn");
const createViewEl = document.getElementById("create-view");
const addPuppyBtn = document.getElementById("add-puppy-btn");
const inputEls = document.querySelectorAll("#create-view input");
const indexBtn = document.getElementById("index-view-btn");

//APPS STATE
let currentView, puppies;

//EVENT LISTENERS
createBtn.addEventListener("click", function () {
  currentView = "create";
  render();
});

addPuppyBtn.addEventListener("click", handleAddPuppy);

indexBtn.addEventListener("click", init);

init();

async function init() {
  currentView = "index";
  let response = await fetch(BASE_URL);
  puppies = await response.json();
  render();
}

function render() {
  indexViewEl.style.display = currentView === "index" ? "block" : "none";
  createViewEl.style.display = currentView === "create" ? "block" : "none";
  if (currentView === "index") {
    let html = puppies.reduce(
      (html, pup) =>
        html + `<div>${pup.name} (${pup.breed}) - age ${pup.age}</div>`,
      ""
    );
    listContainerEl.innerHTML = html;
  } else if (currentView === "create") {
    //TODO
  }
}

async function handleAddPuppy() {
  if (inputEls[0].value) {
    const payLoad = {
      name: inputEls[0].value,
      breed: inputEls[1].value,
      age: inputEls[2].value,
    };

    let response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });

    let newPup = await response.json();
    alert(`Pup added has an id of ${newPup._id}`);
    inputEls[0].value = inputEls[1].value = inputEls[2].value = "";
  }
}

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((users) => {
//     console.log(users);
//   });

// async function getUsers() {
//   let response = await fetch("https://jsonplaceholder.typicode.com/users");
//   let users = await response.json();
//   return users;
// }

// async function getPosts() {
//   let response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   let posts = await response.json();
//   console.log(posts);
// }

// //some stuff here

// (async function () {
//   let users = await getUsers();
//   console.log(users);
// })();
