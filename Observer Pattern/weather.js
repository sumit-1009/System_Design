class TemperatureStation {
  constructor() {
    this.observers = [];
    this.temperature = null;
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs != observer);
  }
  notifyObserver() {
    this.observers.forEach((observer) => observer.update(this));
  }
  setTemperature(temp) {
    if (this.temperature !== temp) {
      this.temperature = temp;
      this.notifyObserver();
    }
  }
  getTemperature() {
    return this.temperature;
  }
}

class App {
  constructor(name) {
    this.name = name;
    this.previousTemp = null;
  }
  update(subject) {
    console.log(
      `${
        this.name
      } , The temperature has been changed to ${subject.getTemperature()}`
    );
    this.previousTemp = subject.getTemperature();
  }
}

const station = new TemperatureStation();
const app1 = new App("App1");
const app2 = new App("App2");

station.addObserver(app1);
station.addObserver(app2);

station.setTemperature(25);
station.setTemperature(25);
//It will not call this 25 again as temperature is not changing so there is no need to inform the observer
station.setTemperature(28);
