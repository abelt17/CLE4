class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, data) {
        const eventListeners = this.events[eventName];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }

    off(eventName, listenerToRemove) {
        const eventListeners = this.events[eventName];
        if (eventListeners) {
            this.events[eventName] = eventListeners.filter(listener => listener !== listenerToRemove);
        }
    }
}

// Create a singleton instance of EventEmitter for usage across your application
const eventEmitter = new EventEmitter();

export { eventEmitter };
