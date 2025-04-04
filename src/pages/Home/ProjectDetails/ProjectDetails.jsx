import React from "react";
import { useParams } from "react-router";
import DetailsBanner from "../../../components/Home/ProjectDetails/DetailsBanner/DetailsBanner";
import getSingleProject from "../../../API/GET/getSingleProject";
import Loading from "../../../components/shared/Loading/Loading";

const ProjectDetails = () => {
  const params = useParams();
  const [singleProject, isLoading] = getSingleProject(params?.id);

  if (isLoading) return <Loading />;

  return (
    <section>
      <DetailsBanner project={singleProject} />
    </section>
  );
};

export default ProjectDetails;
