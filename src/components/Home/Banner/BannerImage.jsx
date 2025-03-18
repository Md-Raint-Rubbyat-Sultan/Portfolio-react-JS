import React from "react";
import PropTypes from "prop-types";

const BannerImage = ({ profile }) => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className={`w-fluid-img mx-auto border-4 border-prime rounded-full`}>
        <img
          src={profile}
          alt="profile"
          className="w-full rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default BannerImage;

BannerImage.propTypes = {
  profile: PropTypes.node,
};
