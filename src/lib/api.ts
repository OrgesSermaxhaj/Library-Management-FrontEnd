// src/lib/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// List of paths that don't require tenant ID
const EXCLUDED_PATHS = [
  '/swagger-ui',
  '/swagger-ui.html',
  '/swagger-ui/index.html',
  '/v3/api-docs',
  '/v3/api-docs/',
  '/swagger-resources',
  '/webjars/'
];

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    const tenantId = config.headers['Tenant-ID'] || localStorage.getItem('tenantId');

    // Check if the path should be excluded from tenant ID requirement
    const shouldExcludeTenant = EXCLUDED_PATHS.some(path => 
      config.url?.startsWith(path)
    );

    // Always include tenant ID unless the path is excluded
    if (!shouldExcludeTenant) {
      if (!tenantId) {
        return Promise.reject(new Error('Tenant ID is required'));
      }
      config.headers.set('X-Tenant-ID', tenantId);
    }

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    // Log the request
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Log error responses
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      headers: error.config?.headers,
    });

    if (error.response?.status === 401) {
      // clear credentials and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('tenantId');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
