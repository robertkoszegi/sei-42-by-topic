// const cars = [
//   { make: "Toyota", yrsOld: 5, mileage: 92399 },
//   { make: "Ford", yrsOld: 12, mileage: 255005 },
//   { make: "Ferrari", yrsOld: 9, mileage: 12966 },
//   { make: "Subaru", yrsOld: 9, mileage: 111266 },
//   { make: "Toyota", yrsOld: 2, mileage: 41888 },
//   { make: "Tesla", yrsOld: 3, mileage: 57720 },
// ];

// const wellDrivenCars = cars.filter((car) => car.mileage > 20000);

// wellDrivenCars.forEach((car) => {
//   console.log(car);
// });

// readFile("readme.txt", function (response) {
//   console.log(response);
// });

// function readFile(file, cb) {
//   const fileInfo = //code to read the file
//   cb(fileInfo);
// }

const lightSequence = [
  { color: "red", time: 3000 },
  { color: "green", time: 2000 },
  { color: "yellow", time: 1000 },
];

const lightEls = document.querySelectorAll("main > div");

let curLightIdx = 0;

function renderLight(cb) {
  lightEls.forEach((el) => (el.style.backgroundColor = "black"));

  lightEls[curLightIdx].style.backgroundColor =
    lightSequence[curLightIdx].color;

  setTimeout(cb, lightSequence[curLightIdx].time);
}

function renderNextLight() {
  renderLight(renderNextLight);
  curLightIdx = ++curLightIdx % 3;
}

renderNextLight();
