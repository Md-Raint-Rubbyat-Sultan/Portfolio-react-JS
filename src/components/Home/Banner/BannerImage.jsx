import React from "react";

const BannerImage = ({ profile }) => {
  return (
    <div className="w-fluid-img mx-auto rounded-full">
      <img
        src={profile}
        alt="profile"
        className="w-full rounded-full object-contain"
      />
    </div>
  );
};

export default BannerImage;
