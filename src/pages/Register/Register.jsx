import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import details from "../../Constants/toastDetails";
import useAuthContext from "../../CustomHooks/useAuthContext/useAuthContext";
import { IoCloudUpload } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";

const Register = () => {
  const { user, verifyEmail, isLoading, setIsLoading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(() => {});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [image, setImage] = useState(null);
  const [perviewImage, setPreviewImage] = useState("");

  const handleImage = async (e) => {
    setPreviewImage("");
    setImage(null);
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024)
      return toast(
        "Image size must be less than 1.5MB",
        details("top-center", "❌​", 6000)
      );

    try {
      const dimention = await getImageDimention(file);
      if (dimention.width > 720 || dimention.height > 720)
        return toast(
          "Height and width must be less than (720 X 720)",
          details("top-center", "❌​", 6000)
        );

      setPreviewImage(URL.createObjectURL(file));

      setImage(file);
    } catch (error) {
      console.log(error);
      toast("Failed to process image", details("top-center", "❌​"));
    }
  };

  const getImageDimention = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(url);
      };

      img.src = url;
    });
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
    };
  }, [image]);

  // redirect to verification page
  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({});

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const name = form.get("user_name");
    const password = form.get("password");
    const confirmPassword = form.get("confirm_password");

    if (password.length < 6) {
      setError({ password: "Password must have 6 characters." });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError({ confirmPassword: "Password didn't match." });
      setIsLoading(false);
      return;
    }

    try {
      // call verification
      const info = await verifyEmail({ email });

      if (info?.accepted[0] === email) {
        navigate("/auth/verify-email", {
          state: {
            path: location?.pathname,
            email,
            fullName: name,
            password,
            profilePic: image,
          },
        });
        toast(
          "An verification email has been send",
          details("top-center", "✅​")
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  return (
    <div>
      <h3 className="p-fluid text-fluid font-medium">
        <Link to={"/"} className="links">
          &larr;Back
        </Link>
      </h3>
      <div className="min-h-screen flex fle-col items-center justify-center py-fluid-m px-fluid">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="text-fluid-l font-bold lg:leading-fluid-l text-prime">
              Create an account for Exclusive Access
            </h2>
            <div>
              {/* image input */}
              <div>
                <label
                  htmlFor="image"
                  className="w-fit text-fluid-xs text-prime font-medium mb-fluid-xs block cursor-pointer"
                >
                  <div className="overflow-hidden mt-fluid">
                    <div className="w-fit border-2 border-prime rounded-full overflow-hidden group">
                      {perviewImage ? (
                        <div className="relative">
                          <img
                            src={perviewImage}
                            alt="Avatar"
                            className="w-fluid-img rounded-full object-contain group-hover:opacity-70 transition-opacity duration-200"
                          />
                          <span className="absolute bottom-[20%] right-[5%] bg-prime-semi p-fluid-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <IoCloudUpload className="text-second" />
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-fluid pr-fluid-xs">
                          <RxAvatar className="text-fluid-l" />
                          <span className="font-medium">Upload Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </label>
                <input
                  id="image"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>
            <p className="hidden md:block text-fluid-xs mt-fluid-l text-prime-semi">
              Already have an account{" "}
              <Link
                state={{ path: location?.state?.path }}
                to={"/auth/login"}
                className="links ml-1"
              >
                Login here
              </Link>
            </p>
          </div>

          <form onSubmit={handelSubmit} className="max-w-md md:ml-auto w-full">
            <h3 className="text-prime text-fluid-m text font-bold mb-8">
              Create Account
            </h3>

            <div className="space-y-fluid-m">
              {/* Name */}
              <div>
                <label className="text-fluid-xs text-prime font-medium mb-fluid-xs block">
                  User Name
                </label>
                <input
                  name="user_name"
                  type="text"
                  required
                  className="bg-final-semi w-full text-sm text-prime px-4 py-3 rounded-md outline-none border focus:border-prime-semi focus:bg-transparent"
                  placeholder="Ranit_Rubbyat"
                />
                {error?.email && (
                  <p className="text-fluid-xs text-red-600 font-medium mb-fluid-xs block">
                    {error?.email}
                  </p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="text-fluid-xs text-prime font-medium mb-fluid-xs block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-final-semi w-full text-sm text-prime px-4 py-3 rounded-md outline-none border focus:border-prime-semi focus:bg-transparent"
                  placeholder="your_email@gmail.com"
                />
                {error?.email && (
                  <p className="text-fluid-xs text-red-600 font-medium mb-fluid-xs block">
                    {error?.email}
                  </p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="text-sm text-prime font-medium mb-fluid-xs block">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    required
                    className="bg-final-semi w-full text-sm text-prime pl-4 pr-14 py-3 rounded-md outline-none border focus:border-prime-semi focus:bg-transparent"
                    placeholder={show ? "expamle pass" : "******"}
                  />
                  <div
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-2 cursor-pointer"
                  >
                    {show ? <VscEye /> : <VscEyeClosed />}
                  </div>
                </div>
                {error?.password && (
                  <p className="text-fluid-xs text-red-600 font-medium mb-fluid-xs block">
                    {error?.password}
                  </p>
                )}
              </div>
              {/* Confirm password */}
              <div>
                <label className="text-sm text-prime font-medium mb-fluid-xs block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="confirm_password"
                    type={showConfirm ? "text" : "password"}
                    required
                    className="bg-final-semi w-full text-sm text-prime pl-4 pr-14 py-3 rounded-md outline-none border focus:border-prime-semi focus:bg-transparent"
                    placeholder={showConfirm ? "expamle pass" : "******"}
                  />
                  <div
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-2 cursor-pointer"
                  >
                    {showConfirm ? <VscEye /> : <VscEyeClosed />}
                  </div>
                </div>
                {error?.confirmPassword && (
                  <p className="text-fluid-xs text-red-600 font-medium mb-fluid-xs block">
                    {error?.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            {/* Register button */}
            <div className="mt-fluid-l">
              <button
                type={isLoading ? "button" : "submit"}
                className="w-full shadow-xl focus:outline-none btn-prime"
                disabled={isLoading}
              >
                {!isLoading ? (
                  <span className="flex flex-wrap justify-center items-center gap-fluid">
                    <IoCloudUpload />
                    Register
                  </span>
                ) : (
                  <span className="flex justify-center items-center text-fluid text-final font-medium">
                    <FiLoader className="animate-spin" />
                  </span>
                )}
              </button>
            </div>
          </form>
          <div className="block md:hidden">
            <p className="text-fluid-xs mt-fluid-l text-prime-semi">
              Already have an account{" "}
              <Link
                state={{ path: location?.state?.path }}
                to={"/auth/login"}
                className="links ml-1"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
