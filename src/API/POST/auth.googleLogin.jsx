import toast from "react-hot-toast";
import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import details from "../../Constants/toastDetails";

const googleLogin = async (fullName, email, profilePic, verify) => {
  try {
    const { data } = await axiosSecure.post("/auth/login-with-google", {
      fullName,
      email,
      profilePic,
      verify,
    });

    return data;
  } catch (error) {
    toast(error?.response?.data?.message, details("top-center", "❌​​"));
  }
};

export default googleLogin;
