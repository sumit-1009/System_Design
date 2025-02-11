class Vehicle {
  getType() {
    return "Generic Type";
  }
}

class Car extends Vehicle {
  getType() {
    return "Car";
  }
}
class Bike extends Vehicle {
  getType() {
    return "Bike";
  }
}

class VehicleFactory {
  static createVehicle(vehicleType) {
    switch (vehicleType) {
      case "car":
        return new Car();
      case "bike":
        return new Bike();
      default:
        return Vehicle();
    }
  }
}
