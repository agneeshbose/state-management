import Store from './js-store/index.js';

// Load up some DOM elements
const counterElement = document.querySelector('#count');
const incrementElement = document.querySelector('#increment');
const decrementElement = document.querySelector('#decrement');

// Define actions, mutations and initial state for data store
const actions = {
    setCount(context, payload) {
        context.commit('setCount', payload);
    },
};

const mutations = {
    setCount(state, payload) {
        state.count = payload;
        return state;
    },
};

const initialState = {
    count: 0,
};

// Create a new instance of store
const store = new Store({ actions, mutations, state: initialState });

// Render latest count value from store to the DOM element
const renderCount = () => {
    counterElement.innerHTML = store.state.count;
};

// Subscribe for state change and render count on state update
store.events.subscribe('stateChange', () => {
    renderCount();
});

// Add click event listeners for increment and decrement buttons
incrementElement.addEventListener('click', function () {
    store.dispatch('setCount', store.state.count + 1);
});

decrementElement.addEventListener('click', function () {
    store.dispatch('setCount', store.state.count - 1);
});
