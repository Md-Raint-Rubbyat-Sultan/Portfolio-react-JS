import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import TechSkills from "../../../shared/TechSkills/TechSkills";
import ProjectLinks from "../../../shared/ProjectLinks/ProjectLinks";

const BannerDetailsSection = ({
  name,
  clintSite,
  serverSite,
  technologies,
  description,
}) => {
  return (
    <div className="flex-1 space-y-fluid">
      {/* Project name */}
      <h2 className="text-fluid-m font-semibold">{name}</h2>
      {/* clint side */}
      {clintSite?.site && clintSite?.git && (
        <div className="space-y-fluid-xs">
          <h3 className="text-fluid font-medium">Clint Site</h3>
          <ProjectLinks links={clintSite} />
        </div>
      )}
      {/* sever side */}
      {serverSite?.site && serverSite?.git && (
        <div className="space-y-fluid-xs">
          <h3 className="text-fluid font-medium">Server Site</h3>
          <ProjectLinks links={serverSite} />
        </div>
      )}
      {/* technilogies used */}
      <div className="space-y-fluid-xs">
        <h3 className="text-fluid font-medium">Technilogies</h3>
        {/* finding the tech according to there uses */}
        <TechSkills technologies={technologies} />
      </div>
      {/* description */}
      <div className="space-y-fluid-xs">
        <h3 className="text-fluid font-medium">Description</h3>
        <article className="text-fluid-xs">{description}</article>
      </div>
    </div>
  );
};

BannerDetailsSection.propTypes = {
  name: PropTypes.string,
  clintSite: PropTypes.object,
  serverSite: PropTypes.object,
  technologies: PropTypes.array,
  description: PropTypes.string,
};

export default BannerDetailsSection;
