import React from "react";
import PropTypes from "prop-types";
import ProjectsCards from "../../shared/ProjectCards/ProjectsCards";
import getAllProjects from "../../../API/GET/getAllProjects";
import Loading from "../../shared/Loading/Loading";

const Projects = ({ allProjects }) => {
  const [allProject, isLoading] = getAllProjects(5);
  console.log(allProject);

  if (isLoading) return <Loading />;

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
