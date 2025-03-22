import { useEffect } from "react";
import axios from "axios";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_PROD_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosBase.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          console.log("unothorized");
        }
        return Promise.reject(err);
      }
    );
  }, []);
  return axiosBase;
};

export default useAxiosSecure;
