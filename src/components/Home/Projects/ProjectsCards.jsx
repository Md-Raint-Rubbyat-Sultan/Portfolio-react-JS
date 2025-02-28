import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import TechSkills from "../../shared/TechSkills/TechSkills";
import ProjectLinks from "../../shared/ProjectLinks/ProjectLinks";

const ProjectsCards = ({
  id,
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
        {/* technologies */}
        <div>
          <h3 className="text-fluid font-medium">Technologies</h3>
          {/* finding the tech according to there uses */}
          <TechSkills technologies={technologies} />
        </div>
        {/* descriptions */}
        <div>
          <h3 className="text-fluid font-medium">Decriptions</h3>
          <article className="line-clamp-2 text-fluid-xs">
            {description}
          </article>
        </div>
        <div className="text-right">
          <Link to={`/details/${id}`}>
            <button className="btn-second">More Details</button>
          </Link>
        </div>
      </div>
    </fieldset>
  );
};

ProjectsCards.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  clintSite: PropTypes.object,
  serverSite: PropTypes.object,
  technologies: PropTypes.array,
  description: PropTypes.string,
};

export default ProjectsCards;
