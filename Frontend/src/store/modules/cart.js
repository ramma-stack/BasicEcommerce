import axios from "../../axios.js";

export default {
    namespaced: true,
    state() {
        return {
            carts: []
        }
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            
            const customPayload = {
                id: payload.product_id,
                title: payload.title,
                price: payload.price,
                image: payload.image,
                quantity: payload.quantity ?? 1,
            };

            const productInCartIndex = state.carts.findIndex(
                (cart) => cart.id === payload.product_id
            )

            if (productInCartIndex !== -1) {
                state.carts[productInCartIndex].quantity++;
                return;
            }

            state.carts.push(customPayload)

        },
        REMOVE_PRODUCT(state, payload) {
            const index = state.carts.findIndex(cart => cart.id === payload.id)
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
            const customPayload = [];
            payload.forEach((item) => {
                customPayload.push({
                    id: item.product_id,
                    title: item.product_list.title,
                    price: item.product_list.price,
                    quantity: item.quantity,
                    image: item.image,
                });
            });
            state.carts = customPayload
        }
    },
    actions: {
        addToCart(context, payload) {
            axios.post('cart', payload)
                .then((response) => {
                    context.commit('ADD_TO_CART', payload)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        removeProduct(context, payload) {
            context.commit('REMOVE_PRODUCT', payload)
        },
        decrementCart(context, paylaod) {
            context.commit('DECREMENT_CART', paylaod)
        },
        clearCart(context) {
            axios.delete('cart')
                .then((response) => {
                    console.log(response);
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