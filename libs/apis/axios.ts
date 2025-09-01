import userStore from "@/hook/store/user-store";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = userStore.getState().token;
    if (token) {
      console.log("add header");
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("no token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
