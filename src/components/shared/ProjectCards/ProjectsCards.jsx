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
  isTrue,
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
          <TechSkills technologies={technologies} gridLg={true} />
        </div>
        {/* descriptions */}
        <div>
          <h3 className="text-fluid font-medium">Decriptions</h3>
          <article className={`${!isTrue ? "" : "line-clamp-2"} text-fluid-xs`}>
            {description ? (
              description
            ) : (
              <span className="text-gradient from-second to-third">
                NO DESCRIPTION PROVIDED
              </span>
            )}
          </article>
        </div>
        {isTrue && (
          <div className="text-right">
            <Link to={`/details/${id}`}>
              <button className="btn-second">Details</button>
            </Link>
          </div>
        )}
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
  isTrue: PropTypes.bool,
};

export default ProjectsCards;
