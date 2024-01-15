import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const isDev = (): boolean => import.meta.env.DEV

const createAPI = (): AxiosInstance => {
  return axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
}

const api: AxiosInstance = createAPI();

export const jwtTokenKey = "token";

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const correctPath: boolean = config.url !== "/user/login" && config.url !== "/user/register"
    if (correctPath) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(jwtTokenKey)}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
);

/**
 * Log outgoing requests if the environment is in development-mode
 */
api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  if (isDev() && request.method) {
    const info = `REQUEST ${request.method.toLocaleUpperCase()} ${request.url}`;
    if (request.method.toLocaleLowerCase() === "get") {
      console.debug(info);
    } else {
      console.debug(info, request.data);
    }
  }
  return request;
}, Promise.reject);

/**
 * Log incoming responses if the environment is in development-mode
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isDev() && response.config && response.config.method) {
      console.debug(
        `RESPONSE ${response.config.method.toLocaleUpperCase()} ${response.config.url}`,
        response.data
      );
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;