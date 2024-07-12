
import axios from 'axios';

// const apiRequest = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });
const apiRequest = axios.create({
  baseURL: 'https://server-eh8i.onrender.com/api',
  withCredentials: true,
});
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
