import React from "react";
import { useParams } from "react-router";
import projectsDB from "/public/db/ProjectsDB.js";
import DetailsBanner from "../../../components/Home/ProjectDetails/DetailsBanner/DetailsBanner";
import getSingleProject from "../../../API/GET/getSingleProject";
import Loading from "../../../components/shared/Loading/Loading";

const ProjectDetails = () => {
  const params = useParams();
  const [singleProject, isLoading] = getSingleProject(params?.id);
  console.log(singleProject);
  // const thisProject = projectsDB.filter(
  //   (project) => project?.id === params?.id
  // );

  if (isLoading) return <Loading />;

  return (
    <section>
      <DetailsBanner project={singleProject} />
    </section>
  );
};

export default ProjectDetails;
