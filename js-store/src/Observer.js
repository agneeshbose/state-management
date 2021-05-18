export default class Observer {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    publish(event, payload) {
        if (this.events[event]) {
            this.events[event].map((callback) => callback(payload));
        }
    }
}
