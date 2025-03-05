import React, { useState } from "react";
import Projects from "./Projects";
import projectsDB from "/public/db/ProjectsDB.js";

const MyProjects = () => {
  const [showBtn, setShowBtn] = useState(true);
  const [projectDbLength, setProjectDbLength] = useState(5);

  const handelShowAll = () => {
    setProjectDbLength(projectsDB.length);
    setShowBtn((prev) => !prev);
  };

  return (
    <section className="mb-fluid-l space-y-fluid-m">
      <h1 className="text-fluid-m font-semibold">Projects</h1>

      {/* projects cards */}
      <Projects allProjects={projectsDB.slice(0, projectDbLength)} />

      {/* show all the projects uploded */}
      {showBtn && projectsDB.length > 5 && (
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
