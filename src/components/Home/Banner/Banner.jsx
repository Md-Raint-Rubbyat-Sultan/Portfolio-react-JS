import React from "react";
import profile from "../../../assets/profile.jpg";
import BannerImage from "./BannerImage";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row ">
      <div className="flex-1">
        <BannerImage profile={profile} />
      </div>
      <div className="flex-1">
        <div className="borde-2 h-1/3 hidden md:block">
          <div className="border-2 -rotate-12 origin-right"></div>
        </div>
        <div className="p-fluid-m">
          <p>name</p>
          <p>email</p>
          <p>phone</p>
          <p>linkdin</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
