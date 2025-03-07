import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const ProjectLinks = ({ links }) => {
  return (
    <div className="space-y-fluid-xs">
      <div className="md:flex md:items-center md:gap-fluid-xs">
        <span className="text-fluid-xs font-medium">Site:</span>
        <Link
          to={`${links?.site}`}
          target="_blank"
          className="links text-fluid-xs line-clamp-1"
        >
          {links?.site}
        </Link>
      </div>
      <div className="md:flex md:items-center md:gap-fluid-xs">
        <span className="text-fluid-xs font-medium">Git Link:</span>
        <Link
          to={`${links?.git}`}
          target="_blank"
          className="text-fluid-xs links line-clamp-1"
        >
          {links?.git}
        </Link>
      </div>
    </div>
  );
};

ProjectLinks.propTypes = {
  links: PropTypes.object,
};

export default ProjectLinks;
