import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";

const ProjectsCards = ({
  name,
  clintSite,
  serverSite,
  technologies,
  description,
}) => {
  return (
    <fieldset className="border-2 border-prime p-fluid rounded-md relative">
      <legend className="px-fluid text-fluid font-semibold">{name}</legend>
      <div className="space-y-fluid">
        {/* clint side */}
        {clintSite?.site && clintSite?.git && (
          <div className="space-y-fluid-xs">
            <h3 className="text-fluid font-medium">Clint Site</h3>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Site:</span>
              <Link
                to={`${clintSite?.site}`}
                target="_blank"
                className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
              >
                {clintSite?.site}
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Git Link:</span>
              <Link
                to={`${clintSite?.git}`}
                target="_blank"
                className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
              >
                {clintSite?.git}
              </Link>
            </div>
          </div>
        )}
        {/* sever side */}
        {serverSite?.site && serverSite?.git && (
          <div className="space-y-fluid-xs">
            <h3 className="text-fluid font-medium">Server Site</h3>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Site:</span>
              <Link
                to={`${serverSite?.site}`}
                target="_blank"
                className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
              >
                {serverSite?.site}
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-fluid-xs">
              <span className="text-fluid-xs font-medium">Git Link:</span>
              <Link
                to={`${serverSite?.git}`}
                target="_blank"
                className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
              >
                {serverSite?.git}
              </Link>
            </div>
          </div>
        )}
        {/* technologies */}
        <div>
          <h3 className="text-fluid font-medium">Technologies</h3>
          <ul className="flex flex-wrap items-center gap-fluid-m text-fluid-xs pl-fluid list-disc">
            {technologies.map((tech, idx) => (
              <li key={idx}>{tech}</li>
            ))}
          </ul>
        </div>
        {/* descriptions */}
        <div>
          <h3 className="text-fluid font-medium">Decriptions</h3>
          <article className="line-clamp-2 text-fluid-xs">
            {description}
          </article>
        </div>
        <div className="text-right">
          <button className="btn-second">More Details</button>
        </div>
      </div>
    </fieldset>
  );
};

ProjectsCards.propTypes = {
  name: PropTypes.string,
  clintSite: PropTypes.object,
  serverSite: PropTypes.object,
  technologies: PropTypes.array,
  description: PropTypes.string,
};

export default ProjectsCards;
