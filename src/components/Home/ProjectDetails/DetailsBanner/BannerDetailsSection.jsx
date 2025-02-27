import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

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
          <div className="space-y-fluid-xs pl-fluid-xs">
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Site:</span>
              <Link
                to={`${clintSite?.site}`}
                target="_blank"
                className="text-fluid-xs text-third hover:text-third hover:underline line-clamp-1"
              >
                {clintSite?.site}
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Git Link:</span>
              <Link
                to={`${clintSite?.git}`}
                target="_blank"
                className="text-fluid-xs text-third hover:text-third hover:underline line-clamp-1"
              >
                {clintSite?.git}
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* sever side */}
      {serverSite?.site && serverSite?.git && (
        <div className="space-y-fluid-xs">
          <h3 className="text-fluid font-medium">Server Site</h3>
          <div className="space-y-fluid-xs pl-fluid-xs">
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Site:</span>
              <Link
                to={`${serverSite?.site}`}
                target="_blank"
                className="text-fluid-xs text-third hover:text-third hover:underline line-clamp-1"
              >
                {serverSite?.site}
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Git Link:</span>
              <Link
                to={`${serverSite?.git}`}
                target="_blank"
                className="text-fluid-xs text-third hover:text-third hover:underline line-clamp-1"
              >
                {serverSite?.git}
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* technilogies used */}
      <div className="space-y-fluid-xs">
        <h3 className="text-fluid font-medium">Technilogies</h3>
        <ul className="grid grid-cols-2 text-fluid-xs pl-fluid list-disc space-y-fluid-xs">
          {technologies?.map((tech, idx) => (
            <li key={idx}>{tech}</li>
          ))}
        </ul>
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
