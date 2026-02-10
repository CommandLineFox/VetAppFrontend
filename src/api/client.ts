import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.dispatchEvent(new Event('force-logout'));
        }

        return Promise.reject(error);
    }
);