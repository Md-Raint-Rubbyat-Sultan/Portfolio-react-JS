import React from "react";
import PropTypes from "prop-types";
import style from "./BannerImage.module.css";

const BannerImage = ({ profile }) => {
  return (
    <div className="flex-1 relative overflow-hidden">
      <div
        className={`w-fluid-img mx-auto border-4 border-prime rounded-full relative ${style.animateCirculate}`}
      >
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
