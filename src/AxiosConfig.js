import axios from 'axios';

// Установка базового URL и перехватчиков
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

axios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        console.log('Token expired, redirecting to login...');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default axios;
