import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const authLogout = async () => {
  try {
    const { data } = await axiosSecure.post("/auth/logout");
    return data;
  } catch (error) {
    toast(error.message, details("top-center", "❌​​"));
    return [null, false];
  }
};

export default authLogout;
