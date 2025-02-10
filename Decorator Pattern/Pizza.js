class Pizza {
  constructor(pizza, cost) {
    this.pizza = pizza;
    this.cost = cost;
  }
  getDescription() {
    return this.pizza;
  }
  getCost() {
    return this.cost;
  }
}

class Toppings {
  constructor(pizza) {
    this.pizza = pizza;
  }
  getDescription() {
    return this.pizza.getDescription();
  }
  getCost() {
    return this.pizza.getCost();
  }
}

class Cheese extends Toppings {
  getDescription() {
    return this.pizza.getDescription() + ", Cheese";
  }
  getCost() {
    return this.pizza.getCost() + 20;
  }
}
class Olives extends Toppings {
  getDescription() {
    return this.pizza.getDescription() + ", Olives";
  }
  getCost() {
    return this.pizza.getCost() + 10;
  }
}
class Pepperoni extends Toppings {
  getDescription() {
    return this.pizza.getDescription() + ", Pepperoni";
  }
  getCost() {
    return this.pizza.getCost() + 10;
  }
}

let pizza = new Pizza("Panner Pizza", 299);
console.log(pizza.getDescription());
console.log(pizza.getCost());

pizza = new Cheese(pizza);
console.log(pizza.getDescription());
console.log(pizza.getCost());
pizza = new Olives(pizza);
console.log(pizza.getDescription());
console.log(pizza.getCost());
pizza = new Pepperoni(pizza);
console.log(pizza.getDescription());
console.log(pizza.getCost());
