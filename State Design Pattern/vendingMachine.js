class VendingState {
  insertMoney(amount) {}
  selectItems(itemName, quantity) {}
  processPayment() {}
  dispenseItems() {}
  cancelProcess() {}
}

class NoMoneyState extends VendingState {
  constructor(machine) {
    super();
    this.machine = machine;
  }
  insertMoney(amount) {
    this.machine.balance += amount;
    console.log(`You have inserted ${this.machine.balance}`);
    this.machine.setState(this.machine.hasMoneyState);
  }
  selectItems() {
    console.log("Insert the amount first!");
  }
  processPayment() {
    console.log("Insert the amount first!");
  }
  dispenseItems() {
    console.log("Insert the amount first!");
  }
  cancelProcess() {
    console.log("No transaction to cancel!");
  }
}

class HasMoneyState extends VendingState {
  constructor(machine) {
    super();
    this.machine = machine;
  }
  insertMoney(amount) {
    this.machine.balance += amount;
    console.log(`You have inserted ${this.machine.balance}`);
  }
  selectItems(itemName, quantity) {
    if (
      !this.machine.items[itemName] ||
      this.machine.items[itemName].stock <= 0
    ) {
      console.log("Item is not available");
      return;
    }
    let currentTotalQuantity = this.machine.selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (currentTotalQuantity + quantity > 5) {
      console.log(
        `Current quantity exceeds 5. Please select 5 quantity at a time to dispense`
      );
      return;
    }
    if (quantity > this.machine.items[itemName].stock) {
      console.log(
        `Not enough stock. Available stock is ${this.machine.items[itemName].stock}`
      );
      return;
    }
    let existingItem = this.machine.selectedItems.find(
      (item) => item.name === itemName
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.machine.selectedItems.push({
        name: itemName,
        price: this.machine.items[itemName].price,
        quantity,
      });
    }
    console.log(`Added ${itemName} X ${quantity} to cart`);
  }
  processPayment() {
    if (this.machine.selectedItems.length === 0) {
      console.log("No items are present to checkout! Please add items to cart");
      return;
    }
    let totalItem = this.machine.selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (totalItem > 5) {
      console.log("Cannot dispense more than 5 products");
      return;
    }
    let totalCost = this.machine.selectedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    if (totalCost > this.machine.balance) {
      console.log(`Insufficient Balance! Please insert more money.`);
      return;
    }
    this.machine.balance -= totalCost;
    this.machine.selectedItems.forEach((item) => {
      this.machine.items[item.name].stock -= item.quantity;
    });
    console.log(
      `Payment Successful: ${this.machine.selectedItems
        .map((i) => `${i.quantity} X ${i.name}`)
        .join(", ")}`
    );
    this.machine.setState(this.machine.dispensingState);
  }
  dispenseItems() {
    console.log("Complete payment first.");
  }
  cancelProcess() {
    console.log(`Transaction Cancelled. Refunding ${this.machine.balance}`);
    this.machine.balance = 0;
    this.machine.selectedItems = [];
    this.machine.setState(this.machine.noMoneyState);
  }
}

class DispensingState extends VendingState {
  constructor(machine) {
    super();
    this.machine = machine;
  }
  insertMoney() {
    console.log("Wait! Dispensing items.");
  }
  selectItems() {
    console.log("Wait! Dispensing items.");
  }
  processPayment() {
    console.log("Wait! Dispensing items.");
  }
  dispenseItems() {
    console.log(
      `Items dispensed: ${this.machine.selectedItems
        .map((i) => `${i.quantity}x ${i.name}`)
        .join(", ")}`
    );
    if (this.machine.balance > 0) {
      console.log(`Refunding ${this.machine.balance}`);
    }
    this.machine.balance = 0;
    this.machine.selectedItems = [];
    this.machine.setState(this.machine.noMoneyState);
  }
  cancelProcess() {
    console.log("Items are already dispensed");
  }
}

class OutOfStockState extends VendingState {
  constructor(machine) {
    super();
    this.machine = machine;
  }
  insertMoney() {
    console.log("Machine is out of stock.");
  }
  selectItems() {
    console.log("Machine is out of stock.");
  }
  processPayment() {
    console.log("Machine is out of stock.");
  }
  dispenseItems() {
    console.log("Machine is out of stock.");
  }
  cancelProcess() {
    console.log("Machine is out of stock.");
  }
}

class VendingMachine {
  constructor(items) {
    this.items = items;
    this.balance = 0;
    this.selectedItems = [];

    this.noMoneyState = new NoMoneyState(this);
    this.hasMoneyState = new HasMoneyState(this);
    this.dispensingState = new DispensingState(this);
    this.outOfStockState = new OutOfStockState(this);

    this.currentState = this.noMoneyState;
  }

  setState(state) {
    this.currentState = state;
  }

  insertMoney(amount) {
    this.currentState.insertMoney(amount);
  }

  selectItems(itemName, quantity) {
    this.currentState.selectItems(itemName, quantity);
  }

  processPayment() {
    this.currentState.processPayment();
  }

  dispenseItems() {
    this.currentState.dispenseItems();
  }

  cancelProcess() {
    this.currentState.cancelProcess();
  }
}

const vendingMachine = new VendingMachine({
  Coke: { name: "Coke", price: 50, stock: 5 },
  Chips: { name: "Chips", price: 30, stock: 3 },
  Candy: { name: "Candy", price: 20, stock: 4 },
});

console.log("\n--- Test: Cancel Transaction ---");
vendingMachine.insertMoney(100);
vendingMachine.selectItems("Coke", 2);
vendingMachine.cancelProcess();

console.log("\n--- Test: Selecting More Than 5 Items in Total ---");
vendingMachine.insertMoney(300);
vendingMachine.selectItems("Coke", 2);
vendingMachine.selectItems("Chips", 2);
vendingMachine.selectItems("Candy", 2);

console.log("\n--- Test: Successful Payment with 5 Items ---");
vendingMachine.processPayment();
vendingMachine.dispenseItems();