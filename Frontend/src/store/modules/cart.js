import axios from "../../axios.js";

export default {
    namespaced: true,
    state() {
        return {
            carts: []
        }
    },
    getters: {
        cartItems(state) {
            // Sort the items based on the updated_at property in descending order
            const sortedCarts = state.carts.slice().sort((a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at);
            });
            return sortedCarts;
        }
    },
    mutations: {
        ADD_TO_CART(state, payload) {

            const productInCartIndex = state.carts.findIndex(
                (cart) => cart.id === payload.id
            )

            if (productInCartIndex !== -1) {
                state.carts[productInCartIndex].quantity++;
                state.carts[productInCartIndex].updated_at = payload.updated_at;
                return;
            }

            state.carts.push(payload)
        },
        REMOVE_PRODUCT(state, payload) {
            const index = state.carts.findIndex(cart => cart.id === payload)
            state.carts.splice(index, 1)
        },
        DECREMENT_CART(state, payload) {
            const index = state.carts.findIndex(cart => cart.id === payload.id)
            state.carts[index].quantity--
        },
        CLEAR_CART(state) {
            state.carts = []
        },
        FETCH_CARTS(state, payload) {
            state.carts = payload
        }
    },
    actions: {
        addToCart(context, payload) {
            axios.post('cart', payload)
                .then((response) => {
                    context.commit('ADD_TO_CART', response.data.cart)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        removeProduct(context, payload) {
            axios.delete(`cart/${payload.id}`,)
                .then(() => {
                    context.commit('REMOVE_PRODUCT', payload.id)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        decrementCart(context, paylaod) {
            axios.delete(`cart/decrement/${paylaod.id}`)
                .then((response) => {
                    console.log(response.data);
                    context.commit('DECREMENT_CART', response.data.cart)
                }).catch((error) => {
                    console.log(error);
                });
        },
        clearCart(context) {
            axios.delete('cart')
                .then((response) => {
                    context.commit('CLEAR_CART')
                }).catch((error) => {
                    console.log(error);
                });
        },
        fetchCarts(context) {
            axios.get('carts')
                .then((response) => {
                    context.commit('FETCH_CARTS', response.data.carts);
                }).catch(() => {
                    console.log('error');
                });
        }
    }
}