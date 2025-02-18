import React from "react";
import PropTypes from "prop-types";

const BannerImage = ({ profile }) => {
  return (
    <div className="flex items-center justify-center relative z-20">
      <div className="w-fluid-img mx-auto border-8 rounded-full">
        <img
          src={profile}
          alt="profile"
          className="w-full rounded-full object-contain"
        />
      </div>
      <div className="absolute w-fluid h-fluid bg-third rounded-full animate-circulate"></div>
    </div>
  );
};

export default BannerImage;

BannerImage.propTypes = {
  profile: PropTypes.node,
};
