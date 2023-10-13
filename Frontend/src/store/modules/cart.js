export default {
    namespaced: true,
    state() {
        return {
            carts: []
        }
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            const productInCartIndex = state.carts.findIndex(
                (cart) => cart.id === payload.id
            );

            if (productInCartIndex !== -1) {
                state.carts[productInCartIndex].quantity++;
                return;
            }

            state.carts.push({
                id: payload.id,
                title: payload.title,
                price: payload.price,
                quantity: 1
            })
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
        }
    },
    actions: {
        addToCart(context, payload) {
            context.commit('ADD_TO_CART', payload)
        },
        removeProduct(context, payload) {
            context.commit('REMOVE_PRODUCT', payload)
        },
        decrementCart(context, paylaod) {
            context.commit('DECREMENT_CART', paylaod)
        },
        clearCart(context) {
            context.commit('CLEAR_CART')
        }
    }
}