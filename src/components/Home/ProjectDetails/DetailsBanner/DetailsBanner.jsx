import React from "react";
import PropTypes from "prop-types";
import BannerDetailsSection from "./BannerDetailsSection";

const DetailsBanner = ({ project }) => {
  return (
    <div className="md:flex md:items-start my-fluid-m">
      {/* image carousel of project */}
      <div className="flex-1">image caroules</div>
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
