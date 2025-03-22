import React from "react";
import PropTypes from "prop-types";
import ProjectsCards from "../../shared/ProjectCards/ProjectsCards";

const Projects = ({ allProjects }) => {
  return (
    <div className="space-y-fluid-m">
      {allProjects?.map((project, idx) => (
        <ProjectsCards
          key={idx}
          id={project?._id}
          name={project?.name}
          clintSite={project?.clintSite}
          serverSite={project?.serverSite}
          technologies={project?.technologies}
          description={project?.description}
          isTrue={true}
        />
      ))}
    </div>
  );
};

Projects.propTypes = {
  allProjects: PropTypes.array,
};

export default Projects;
