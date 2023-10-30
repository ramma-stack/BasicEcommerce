import axios from '../../axios.js';

export default {
    namespaced: true,
    state() {
        return {
            user: [],
            errors: [
                { field: 'email', message: 'Email is required' },
            ]
        }
    },
    getters: {
        userLength(state) {
            return state.user.length
        },
        errorsLength(state) {
            return state.errors.length
        },
    },
    mutations: {
        SIGN_IN(state, payload) {
            state.errors = []
            state.user = payload.user
            const token = payload.token_type + ' ' + payload.access_token
            localStorage.setItem('access_token', token)
        },
        SIGN_OUT(state) {
            state.user = []
            localStorage.removeItem('access_token')
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
    },
    actions: {
        async register(context, { name, email, password }) {
            try {
                const response = await axios.post('register', { name, email, password })
                await context.commit('SIGN_IN', response.data)
            } catch (error) {
                context.commit('SET_ERRORS', error.response.data)
            }
        },
        async login(context, { email, password }) {
            try {
                const response = await axios.post('login', { email, password })
                axios.defaults.headers.common['Authorization'] = response.data.token_type + ' ' + response.data.access_token
                await context.commit('SIGN_IN', response.data)
            } catch (error) {
                context.commit('SET_ERRORS', error.response.data)
            }
        },
        async logout(context) {
            try {
                await axios.post('logout')
                await context.commit('SIGN_OUT')
            } catch (error) {
                console.log(error)
            }
        },
    }
}