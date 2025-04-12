import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import details from "../../Constants/toastDetails";
import useAuthContext from "../../CustomHooks/useAuthContext/useAuthContext";
import { IoCloudUpload } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import googleLogin from "../../API/POST/auth.googleLogin";

const Login = () => {
  const location = useLocation();
  const {
    user,
    login,
    isLoading,
    setIsLoading,
    refetch,
    loginWithGoogle,
    isGoogleAuthLoading,
  } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(() => {});
  const [show, setShow] = useState(false);

  // Google Auth
  const handleGoogleLogin = async () => {
    try {
      const { user: info } = await loginWithGoogle();
      if (info?.accessToken) {
        const data = await googleLogin(
          info?.displayName,
          info?.email,
          info?.photoURL,
          info?.emailVerified
        );
        if (data) {
          refetch();
          navigate(location?.state?.path || "/", { replace: true });
          toast("Login Successfull!", details("top-center", "✅​"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Email Password Auth
  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({});

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      setError({ password: "Password must have 6 characters." });
      setIsLoading(false);
      return;
    }

    try {
      // call login
      const res = await login({ email, password });
      if (res) {
        refetch();
        navigate(location?.state?.path || "/", { replace: true });
        toast("Login Successfull!", details("top-center", "✅​"));
      }
    } catch (error) {
      toast(error.message, details("top-center", "❌​​"));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check user loged in
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
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-fluid-xs fluid-m text-prime-semi leading-relaxed">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-fluid-xs mt-fluid-l text-prime-semi">
              Don't have an account{" "}
              <Link
                state={{ path: location?.pathname }}
                to={"/auth/register"}
                className="links ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          <form onSubmit={handelSubmit} className="max-w-md md:ml-auto w-full">
            <h3 className="text-prime text-fluid-m text font-bold mb-8">
              Login
            </h3>

            <div className="space-y-fluid-m">
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
              {/* Forget Password */}
              <div className="flex flex-wrap items-center justify-between gap-fluid">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-fluid w-fluid text-blue-600 focus:ring-blue-500 border-final-semi rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-prime-semi"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-fluid-xs">
                  <Link
                    to={"jajvascript:void(0);"}
                    className="links font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
            {/* Login button */}
            <div className="mt-fluid-l">
              <button
                type={isLoading ? "button" : "submit"}
                className="w-full shadow-xl focus:outline-none btn-prime"
                disabled={isLoading}
              >
                {!isLoading ? (
                  <span className="flex flex-wrap justify-center items-center gap-fluid">
                    <IoCloudUpload />
                    Log in
                  </span>
                ) : (
                  <span className="flex justify-center items-center text-fluid text-final font-medium">
                    <FiLoader className="animate-spin" />
                  </span>
                )}
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-final-semi" />
              <p className="text-sm text-prime text-center">or</p>
              <hr className="w-full border-final-semi" />
            </div>
            {/* social methods */}
            <div className="space-x-fluid-m flex justify-center">
              {/* google button */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="border-none outline-none cursor-pointer"
                disabled={isGoogleAuthLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </button>
              {/* facebook button */}
              <button
                type="button"
                className="border-none outline-none cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#1877f2"
                    d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                    data-original="#1877f2"
                  />
                  <path
                    fill="#fff"
                    d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                    data-original="#ffffff"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
