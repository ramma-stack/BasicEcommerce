import axios from '../../axios'

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            product: {},
            // pagination: null,
            // searchQuery: '',
            // page: 1,
        }
    },
    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
        },
        GET_PRODUCT(state, product) {
            state.product = product
        },
        GET_PAGINATION(state, pagination) {
            state.pagination = pagination
        },
        SEARCH_PRODUCTS(state, query) {
            state.searchQuery = query
        },
    },
    actions: {
        getProducts(context, { page, searchQuery }) {
            axios.get(`products?page=${page}&search=${searchQuery}`)
                .then(response => {
                    context.commit('GET_PRODUCTS', response.data.products);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getProduct(context, id) {
            axios.get(`product/${id}`)
                .then(response => {
                    context.commit('GET_PRODUCT', response.data.product);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        searchProducts(context, query) {
            context.commit('SEARCH_PRODUCTS', query);
            context.dispatch('getProducts');
        },
        pageChange(context, page) {
            context.state.page = page;
            context.dispatch('getProducts');
        },
    },
}