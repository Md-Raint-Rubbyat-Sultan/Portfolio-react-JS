import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const authVerifyEmail = async (email) => {
  try {
    const { data } = await axiosSecure.post("/auth/verify-email", {
      email,
    });
    return data;
  } catch (error) {
    toast(error.message, details("top-center", "❌​​"));
  }
};

export default authVerifyEmail;
