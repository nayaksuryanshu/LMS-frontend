import axios from 'axios';

// Base URL configuration
const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Common headers setup
const setCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
};

// Authentication token management
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            removeAuthToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Error handling functions
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        return {
            message: error.response.data?.message || 'Server error occurred',
            status: error.response.status,
            data: error.response.data,
        };
    } else if (error.request) {
        // Network error
        return {
            message: 'Network error - please check your connection',
            status: null,
            data: null,
        };
    } else {
        // Other error
        return {
            message: error.message || 'An unexpected error occurred',
            status: null,
            data: null,
        };
    }
};

// API methods
const apiService = {
    get: async (url, config = {}) => {
        try {
            const response = await api.get(url, {
                headers: { ...setCommonHeaders(), ...config.headers },
                ...config,
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    post: async (url, data, config = {}) => {
        try {
            const response = await api.post(url, data, {
                headers: { ...setCommonHeaders(), ...config.headers },
                ...config,
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    put: async (url, data, config = {}) => {
        try {
            const response = await api.put(url, data, {
                headers: { ...setCommonHeaders(), ...config.headers },
                ...config,
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    delete: async (url, config = {}) => {
        try {
            const response = await api.delete(url, {
                headers: { ...setCommonHeaders(), ...config.headers },
                ...config,
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
export default {
    ...apiService,
    setAuthToken,
    removeAuthToken,
    getAuthToken,
    handleApiError,
};

