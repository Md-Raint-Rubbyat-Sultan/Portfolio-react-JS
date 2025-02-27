import React from "react";
import PropTypes from "prop-types";
import BannerDetailsSection from "./BannerDetailsSection";
import ChalangesCarousel from "./ChalangesCaousel";

const DetailsBanner = ({ project }) => {
  return (
    <div className="space-y-fluid-m space-x-fluid-m md:flex md:items-start my-fluid-m">
      {/* image carousel of project */}
      <ChalangesCarousel
        chalanges={project?.chalanges}
        arrayLength={project?.chalanges.length}
      />
      {/* details about project */}
      <BannerDetailsSection
        name={project?.name}
        clintSite={project?.clintSite}
        serverSite={project?.serverSite}
        description={project?.description}
        technologies={project?.technologies}
      />
    </div>
  );
};

DetailsBanner.propTypes = {
  project: PropTypes.object,
};

export default DetailsBanner;
