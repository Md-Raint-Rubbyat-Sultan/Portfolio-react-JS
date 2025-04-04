import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const authRegister = async (fullName, email, password, profile) => {
  try {
    const { data } = await axiosSecure.post("/auth/register", {
      fullName,
      email,
      password,
      profilePic: profile,
    });
    return data;
  } catch (error) {
    toast(error.message, details("top-center", "❌​​"));
  }
};
export default authRegister;
