import axios from '../../axios'

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            product: {},
        }
    },
    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
        },
        GET_PRODUCT(state, product) {
            state.product = product
        },
    },
    actions: {
        async getProducts(context, { page, searchQuery }) {
            try {
                const response = await axios.get(`products?page=${page}&search=${searchQuery}`)
                await context.commit('GET_PRODUCTS', response.data.products)
            } catch (error) {
                console.log(error)
            }
        },
        async getProduct(context, id) {
            try {
                const response = await axios.get(`product/${id}`)
                await context.commit('GET_PRODUCT', response.data.product)
            } catch (error) {
                console.log(error)
            }
        }
    },
}