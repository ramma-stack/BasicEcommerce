import { createStore } from 'vuex'
import product from './modules/product';
import cart from './modules/cart';
import auth from './modules/auth';

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
        cart,
        auth,
    },
});

export default store;