import axios from "axios";
import { refreshToken } from "./api-backend";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
    }

    return Promise.reject(error);
  }
);

export default instance;
