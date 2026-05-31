import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('codemaster_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpiar tokens locales en caso de token expirado o no autorizado
      localStorage.removeItem('codemaster_user');
      localStorage.removeItem('codemaster_token');
      // Redireccionar al login si no estamos en una página pública
      if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/registro' && !window.location.pathname.startsWith('/curso/')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default api;
