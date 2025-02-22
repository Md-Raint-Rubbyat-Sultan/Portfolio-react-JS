import React from "react";
import { useParams } from "react-router";
import projectsDB from "/public/db/ProjectsDB.js";
import DetailsBanner from "../../../components/Home/ProjectDetails/DetailsBanner/DetailsBanner";

const ProjectDetails = () => {
  const params = useParams();
  const thisProject = projectsDB.filter(
    (project) => project?.id === params?.id
  );

  return (
    <section>
      {thisProject?.map((project, idx) => (
        <DetailsBanner key={idx} project={project} />
      ))}
    </section>
  );
};

export default ProjectDetails;
