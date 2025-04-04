import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_PROD_URL,
  withCredentials: true, // Required for cookies
});

const handleLogout = async () => {
  try {
    await axiosSecure.post("/auth/logout", {});
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Response interceptor
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized/forbidden errors
    if ([401, 403].includes(error.response?.status)) {
      await handleLogout();
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
