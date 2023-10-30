import axios from 'axios';

const token = localStorage.getItem('access_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export default Api;