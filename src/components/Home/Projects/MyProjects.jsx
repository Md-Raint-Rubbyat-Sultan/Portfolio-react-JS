import React, { useState } from "react";
import Projects from "./Projects";
import getAllProjects from "../../../API/GET/getAllProjects";
import Loading from "../../shared/Loading/Loading";

const MyProjects = () => {
  const [showBtn, setShowBtn] = useState(true);
  const [projectsLength, setProjectDbLength] = useState(3);
  // get the data
  const [allProject, isLoading] = getAllProjects(projectsLength);

  const handelShowAll = () => {
    setProjectDbLength(allProject?.countProject);
    setShowBtn((prev) => !prev);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="mb-fluid-l space-y-fluid-m">
      <h1 className="text-fluid-m font-semibold">Projects</h1>

      {/* projects cards */}
      <Projects allProjects={allProject?.data} />

      {/* show all the projects uploded */}
      {showBtn && allProject?.countProject > 3 && (
        <div className="text-center">
          <button onClick={handelShowAll} className="btn-third">
            Show All
          </button>
        </div>
      )}
    </section>
  );
};

export default MyProjects;
