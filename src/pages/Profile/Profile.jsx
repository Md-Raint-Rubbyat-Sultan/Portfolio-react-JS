import React from "react";
import useAuthContext from "../../CustomHooks/useAuthContext/useAuthContext";
import Loading from "../../components/shared/Loading/Loading";
import formatDate from "../../Constants/formatDate";
import { IoMdColorPalette, IoMdCreate } from "react-icons/io";

const Profile = () => {
  const { user, isUserLoading } = useAuthContext();

  if (isUserLoading) return <Loading />;

  const { fullName, email, profilePic, role, createdAt } = user;

  return (
    <section className="flex flex-col justify-center items-center gap-fluid-m mb-fluid-m">
      <div className="w-fit rounded-full overflow-hidden">
        <img
          src={profilePic?.url}
          alt="Profile Picture"
          className="w-fluid-img"
        />
      </div>
      <div className="space-y-fluid text-center text-fluid-xs">
        <p className="text-fluid-m font-medium">{fullName}</p>
        <p>since {formatDate(createdAt)}</p>
        <p>{email}</p>
        <p>Role: {role}</p>
      </div>
      <button
        type="button"
        className="flex items-center gap-fluid-xs btn-prime"
      >
        Edit
        <IoMdCreate />
      </button>
    </section>
  );
};

export default Profile;
