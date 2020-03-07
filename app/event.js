//Pub sub event bus
class Event {
  constructor () {
    this.events = {};
  }
  subscribe(eventName, callback = () => { }) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName) {
    delete this.events[eventName];
  }

  publish(eventName, data) {
    let event = this.events[eventName];
    if (event) {
      event.forEach((cb) => cb(data));
    }
  }
};
let event = new Event();
export default event;