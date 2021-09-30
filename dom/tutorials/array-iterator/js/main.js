//forEach YOU DO

// const friends = ["Melissa", "Marc", "Andrew", "Nick"];

// friends.forEach((friend) => {
//   console.log(friend.toLowerCase());
// });

//map YOU DO

// const people = [
//   { name: "Fred", town: "Bedrock" },
//   { name: "Susan", town: "Miami" },
//   { name: "John", town: "Arcadia" },
// ];

// const els = people.map(function (person, idx) {
//   const el = document.createElement("div");
//   el.innerHTML = `${person.name} <span>(${person.town})</span>`;
//   return el;
// });

// console.log(els);

// let div = document.querySelector("div");

// div.appendChild(els[0]);

// const instructors = ["Alex", "Ben", "Daniel", "Morgan", "Micah", "Jims"];

// const newInstructors = instructors.map((instructor) => {
//   return `${instructor} is awesome`;
// });

// console.log(newInstructors);

//reduce YOU DO

// const votes = ["Yes", "No", "No", "Yes", "Yes"];
// let tally = votes.reduce(
//   function (acc, vote) {
//     acc[vote]++;
//     return acc;
//   },
//   { Yes: 0, No: 0 }
// );

// console.log(tally);

//filter YOU DO
// const nums = [100, 2, 5, 42, 99];
// const odds = nums.filter(function (num) {
//   return num % 2;
// });

// console.log(odds);

// const names = ["david", "dor", "robert", "jeff", "brittney"];

// const namesWithD = names.filter(function (name) {
//   return name[0] === "d";
// });

// console.log(namesWithD);

// const people = ["jerks", "nice people", "jerks", "nice people", "nice people"];

// const jerks = people.filter((person) => person === "jerks");

// console.log(jerks);

//find YOU DO

const cars = [
  { color: "white", make: "BMW", year: 2001 },
  { color: "white", make: "Toyota", year: 2013 },
  { color: "white", make: "Ford", year: 2014 },
  { color: "white", make: "Tesla", year: 2016 },
];

// const notToOldCar = cars.find((car) => car.year > 2014);

// console.log(notToOldCar);

//some YOU DO
// const myRoom = ["evil monkey", "bed", "lamp"];

// const emInMyRoom = myRoom.some((item) => item === "evil monkey");

// console.log(emInMyRoom);

//every YOU DO

// let everyCarIsBlue = cars.every(function (car) {
//   return car.color === "blue";
// });

// let everyCarIsWhite = cars.every((car) => car.color === "white");

// console.log(everyCarIsBlue);
// console.log("is every car white? ", everyCarIsWhite);
