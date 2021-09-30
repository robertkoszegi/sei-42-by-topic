class Vehicle {
  static #num = 0;
  constructor(vin, make, model) {
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.running = false;
    ++Vehicle.#num;
  }

  start() {
    this.running = true;
    console.log("running...");
  }

  stop() {
    this.running = false;
    console.log("stopped...");
  }

  toString() {
    return `Vehicle (${this.vin}) is a ${this.make} model ${this.model}`;
  }

  static getNumVehciles() {
    return Vehicle.#num;
  }
}

class Automobile extends Vehicle {
  constructor(vin, make, model, numDoors) {
    super(vin, make, model);
    this.numDoors = numDoors;
  }

  honk() {
    console.log("honk honk");
  }
}

class Plane extends Vehicle {
  constructor(vin, make, model, airline) {
    super(vin, make);
    this.model = model.toUpperCase();
    this.airline = airline;
  }

  engageAutoPilot() {
    console.log("Look mom, no hands!");
  }
}

let v1 = new Plane("X123Y", "Boeing", "sevenfortyseven", "Air Canada");
let v2 = new Vehicle("X123Y", "Boeing", "747");
let fastCar = new Automobile("TS123Z", "Tesla", "P100D", 4);
// let v2 = new Vehicle("14576", "Ford");

// function Vehicle(vin, make, model) {
//   this.vin = vin;
//   this.make = make;
//   this.model = model;
//   this.running = false;
// }

// Vehicle.prototype.start = function () {
//   this.running = true;
//   console.log("running...");
// };

// let car = new Vehicle("A1234", "Toyota", "Camry");
