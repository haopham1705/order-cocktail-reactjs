import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
    header: {
        'Content-type': 'application/json',
    },
})
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    return Promise.reject(error);
});
// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response.data.drinks;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;