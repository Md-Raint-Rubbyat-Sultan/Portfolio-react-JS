import React from "react";
import profile from "../../../assets/profile.jpg";
import BannerImage from "./BannerImage";
import Contacts from "./Contacts";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row my-fluid-l">
      <BannerImage profile={profile} />
      <Contacts />
    </section>
  );
};

export default Banner;
