import React from "react";
import useAuthContext from "../../CustomHooks/useAuthContext/useAuthContext";
import Loading from "../../components/shared/Loading/Loading";
import formatDate from "../../Constants/formatDate";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Profile = () => {
  const { user, isUserLoading } = useAuthContext();

  if (isUserLoading) return <Loading />;

  const { fullName, email, profilePic, role, createdAt } = user;

  return (
    <section className="flex flex-col justify-start items-center gap-fluid-m mb-fluid-m min-h-screen">
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
      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-fluid-m">
        {/* Edit button */}
        <button
          type="button"
          className="flex items-center gap-fluid-xs btn-prime"
        >
          Edit
          <IoMdCreate />
        </button>
        {/* Delete button */}
        <button
          type="button"
          className="flex items-center gap-fluid-xs btn-prime"
        >
          Delete
          <MdDelete />
        </button>
      </div>
    </section>
  );
};

export default Profile;
