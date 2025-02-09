class ProductAvailability {
  constructor() {
    this.observers = [];
    this.availability = false;
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notifyObserver() {
    this.observers.forEach((observer) => observer.update(this));
  }
  setAvailability(status) {
    this.availability = status;
    this.notifyObserver();
  }
  getAvailability() {
    return this.availability;
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
  update(subject) {
    if (subject.getAvailability()) {
      console.log(`${this.name} , Product is back in stocks`);
    } else {
      console.log(`${this.name} , Product is out of stock`);
    }
  }
}

const product = new ProductAvailability();
const user = new User("Sumit");
product.addObserver(user);
product.setAvailability(true);
