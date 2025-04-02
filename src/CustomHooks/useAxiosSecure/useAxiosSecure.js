import { useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_PROD_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const handelLogout = async () => {
    const res = await axiosBase.post("/auth/logout", {});
    return res;
  };

  useEffect(() => {
    axiosBase.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          const { data } = await handelLogout();
        }
        return Promise.reject(err);
      }
    );
  }, []);
  return axiosBase;
};

export default useAxiosSecure;
