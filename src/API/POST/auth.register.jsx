import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";
import convertToBase64 from "../../Constants/converToBase64";

const authRegister = async (
  fullName,
  email,
  password,
  profilePic,
  verificationCode
) => {
  try {
    let profilePicBase64 = null;
    if (profilePic) {
      profilePicBase64 = await convertToBase64(profilePic);
    }

    const { data } = await axiosSecure.post("/auth/register", {
      email,
      fullName,
      password,
      profilePic: profilePicBase64,
      verificationCode,
    });
    return data;
  } catch (error) {
    console.log(error);
    toast(error.message, details("top-center", "❌​​"));
  }
};
export default authRegister;
