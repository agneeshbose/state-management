import Observer from './src/Observer.js';

export default class Store {
    constructor({ actions = {}, mutations = {}, state = {} }) {
        let self = this;

        self.actions = actions;
        self.mutations = mutations;

        self.events = new Observer();
        self.state = new Proxy(state, {
            set: function (state, key, value) {
                state[key] = value;
                self.events.publish('stateChange', self.state);
                return true;
            },
        });
    }

    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return;
        }

        this.actions[actionKey](this, payload);
    }

    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return;
        }

        let newState = this.mutations[mutationKey](this.state, payload);

        this.state = Object.assign(this.state, newState);
    }
}
