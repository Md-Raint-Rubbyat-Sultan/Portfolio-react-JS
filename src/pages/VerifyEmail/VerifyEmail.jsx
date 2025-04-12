import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthContext from "../../CustomHooks/useAuthContext/useAuthContext";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";
import { IoCloudUpload } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";

const VerifyEmail = () => {
  const { user, register, verifyEmail, isLoading, setIsLoading, refetch } =
    useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [validationCode, setValidationCode] = useState(null);
  const [resendToggle, setResendToggle] = useState(false);

  const handelOnChange = (e) => {
    const num = e.target.value;
    setValidationCode(num);
  };

  const handelOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!location?.state?.email) {
      toast("Invalid User Email", details("top-center", "❌​​"));
      navigate("/auth/register", { replace: true });
      return;
    }

    try {
      const res = await register({
        fullName: location?.state?.fullName,
        email: location?.state?.email,
        password: location?.state?.password,
        profilePic: location?.state?.profilePic,
        verificationCode: validationCode,
      });

      if (res) {
        refetch();
        navigate(location?.state?.path || "/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendToggle(true);
    try {
      const info = await verifyEmail({ email: location?.state?.email });

      if (info?.accepted[0] === location?.state?.email && info !== undefined) {
        toast(
          "An verification email has been send",
          details("top-center", "✅​")
        );
      }
    } catch (error) {
      return;
    } finally {
      setResendToggle(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  return (
    <div className="px-fluid py-fluid-m md:px-fluid-xl md:py-fluid-xxl">
      <div className="space-y-fluid-m p-fluid-m bg-prime-semi text-final rounded">
        <h3 className="text-fluid font-medium">
          <Link to={"/auth/register"} className="links text-second">
            &larr;Back
          </Link>
        </h3>
        <div className="flex flex-col items-center gap-fluid-m">
          <div className="space-y-fluid-m text-fluid font-medium">
            <h2 className="text-center text-third text-fluid-m">
              Verify Email
            </h2>
            <p>
              <span className="text-third">&rarr;</span> An email has been send
              to {location?.state?.email}.
            </p>
            <p>
              <span className="text-third">&rarr;</span> If you do not found the
              email to your inbox,
            </p>
            <p>
              <span className="text-third">&rarr;</span> Please also check the
              spam folder of your email.
            </p>
            <p>
              <span className="text-third">&rarr;</span> VErification code will
              be expired within 5 minutes.
            </p>
            <p>
              To get verification Code again click,{" "}
              {!resendToggle ? (
                <span onClick={handleResend} className="links cursor-pointer">
                  Resend.
                </span>
              ) : (
                <span className="inline links">
                  <span>Resend.</span>
                  <FiLoader className="inline animate-spin" />
                </span>
              )}
            </p>
          </div>
          <form
            onSubmit={handelOnClick}
            className="flex flex-col items-center w-full gap-fluid-m"
          >
            <div className="md:w-1/2 mx-auto">
              <label className="text-fluid-xs font-medium mb-fluid-xs block">
                Verification Code
              </label>
              <input
                name="code"
                type="text"
                required
                onChange={handelOnChange}
                className="bg-prime-semi w-full text-sm text-final px-4 py-3 rounded-md outline-none border focus:border-prime-semi"
                placeholder="1234"
              />
            </div>
            <button type="submit" className="btn-prime" disabled={isLoading}>
              {!isLoading ? (
                <span className="flex flex-wrap justify-center items-center gap-fluid">
                  <IoCloudUpload />
                  Submit
                </span>
              ) : (
                <span className="text-fluid text-final font-medium">
                  <FiLoader className="animate-spin" />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
