import axios from 'axios';
import TokenUtils from '../../utils/token';

export const http = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_PRODUCTION_URL ||
    process.env.NEXT_PUBLIC_API_LOCAL_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = TokenUtils.getToken();

    if (!config.headers.Authorization) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);
