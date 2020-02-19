//All properties will be available to childs
let Ship = function(uniqueNumber, name){
    this.idString = uniqueNumber;
    this.name = name;
}

//Methods are created on prototype, and will not be on child
Ship.prototype.startTrip = function(tripNumber){
    this.tripId = tripNumber;
    console.log("trip started...");
}

// I want to extends from ship: use .call() on ship, bounding to this object
let Cargo = function(uniqueNumber, name, imoNumber){
    Ship.call(this, uniqueNumber, imoNumber);
    this.imoNumber = imoNumber;
}

//We've to inherit also methods: just assign to the child prototype the Parent's prototype
Cargo.prototype = Object.create(Ship.prototype);

//Now everithing is inhertited, but class seems to be the parent:
console.log(Cargo.prototype.constructor);

//Therefore we want to set right identity to the child class: override the child constructor
//...and setting child class constructor to itself
Cargo.prototype.constructor = Cargo;

let newShip = new Cargo("20398402", "EUROCARGO VENEZIA", "10298301");

//child method is available: child prototype is equal to the parent one
newShip.startTrip("00001");