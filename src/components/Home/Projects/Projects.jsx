import React from "react";
import PropTypes from "prop-types";
import ProjectsCards from "./ProjectsCards";

const Projects = ({ allProjects }) => {
  return (
    <div className="space-y-fluid-m">
      {allProjects?.map((project, idx) => (
        <ProjectsCards
          key={idx}
          id={project?.id}
          name={project?.name}
          clintSite={project?.clintSite}
          serverSite={project?.serverSite}
          technologies={project?.technologies}
          description={project?.description}
        />
      ))}
    </div>
  );
};

Projects.propTypes = {
  allProjects: PropTypes.array,
};

export default Projects;
