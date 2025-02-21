import React from "react";
import ProjectsCards from "./ProjectsCards";
import projectsDB from "/public/db/ProjectsDB.js";

const Projects = () => {
  return (
    <div className="my-fluid-m">
      {projectsDB?.map((project, idx) => (
        <ProjectsCards
          key={idx}
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

export default Projects;
