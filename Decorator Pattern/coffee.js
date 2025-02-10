class Coffee {
  constructor(coffee, cost) {
    this.coffee = coffee;
    this.cost = cost;
  }
  getDescription() {
    return this.coffee;
  }
  getCost() {
    return this.cost;
  }
}

class Toppings {
  constructor(coffee) {
    this.coffee = coffee;
  }
  getDescription() {
    return this.coffee.getDescription();
  }
  getCost() {
    return this.coffee.getCost();
  }
}

class Milk extends Toppings {
  getDescription() {
    return this.coffee.getDescription() + ", Milk";
  }
  getCost() {
    return this.coffee.getCost() + 20;
  }
}
class Sugar extends Toppings {
  getDescription() {
    return this.coffee.getDescription() + ", Sugar";
  }
  getCost() {
    return this.coffee.getCost() + 10;
  }
}
class WhippedCream extends Toppings {
  getDescription() {
    return this.coffee.getDescription() + ", WhippedCream";
  }
  getCost() {
    return this.coffee.getCost() + 10;
  }
}

let coffee = new Coffee("Latte", 299);
console.log(coffee.getDescription());
console.log(coffee.getCost());

coffee = new Milk(coffee);
console.log(coffee.getDescription());
console.log(coffee.getCost());
coffee = new Sugar(coffee);
console.log(coffee.getDescription());
console.log(coffee.getCost());
coffee = new WhippedCream(coffee);
console.log(coffee.getDescription());
console.log(coffee.getCost());
