import axios from "axios";

export const api = axios.create({
  baseURL: "/backend-api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any) => {
  failedQueue.forEach((promise: any) => {
    if (error) promise.reject(error);
    else promise.resolve();
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((reject, resolve) => {
          failedQueue.push({ reject, resolve });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch {
        processQueue(error);
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        failedQueue = [];
      }
    }

    return Promise.reject(error);
  },
);
