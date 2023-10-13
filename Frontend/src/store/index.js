import { createStore } from 'vuex'
import product from './modules/product';
import cart from './modules/cart';

const store = createStore({
    state() {
        return {

        }
    },
    mutations: {

    },
    actions: {

    },
    modules: {
        product,
        cart
    },
});

export default store;