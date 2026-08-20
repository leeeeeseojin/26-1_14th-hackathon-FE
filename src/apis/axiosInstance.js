import axios from 'axios';

import {
  clearAccessToken,
  getAccessToken,
  isPublicRequest,
} from './authToken';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const url = config.url ?? '';
    const method = (config.method ?? 'GET').toUpperCase();

    if (isPublicRequest(method, url)) {
      if (config.headers) {
        delete config.headers.Authorization;
      }

      return config;
    }

    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    const method = error.config?.method ?? 'GET';

    if (status === 401 && !isPublicRequest(method, url)) {
      clearAccessToken();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
