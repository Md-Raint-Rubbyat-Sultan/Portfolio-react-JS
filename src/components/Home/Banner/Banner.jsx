import React from "react";
import profile from "../../../assets/profile.jpg";
import BannerImage from "./BannerImage";
import Contacts from "./Contacts";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row ">
      <div className="flex-1">
        <BannerImage profile={profile} />
      </div>
      <Contacts />
    </section>
  );
};

export default Banner;
