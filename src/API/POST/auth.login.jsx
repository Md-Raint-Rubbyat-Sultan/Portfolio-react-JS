import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const authLogin = async (email, password) => {
  try {
    const { data } = await axiosSecure.post("/auth/login", { email, password });
    // console.log(data, email, password, "from main api");
    return data;
  } catch (error) {
    // console.log("from auth login err", error);
    toast(error?.response?.data?.message, details("top-center", "❌​​"));
  }
};

export default authLogin;
