import React, { useState } from "react";
import SkillsCard from "./SkillsCard";
import projectsDB from "/public/db/ProjectsDB.js";

const ProjectSkills = () => {
  const [numOfSkills, setNumOfSkills] = useState(5);
  const portfolio = projectsDB.filter(
    (project) => project?.name === "Portfolio"
  );

  const techObj = portfolio[0]?.technologies?.flatMap((skill) =>
    Object.values(skill).flat()
  );

  const handelShowAll = () => {
    setNumOfSkills(techObj?.length);
  };

  return (
    <div className="order-1 md:order-2">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid text-wrap font-semibold">
          Skills Used In This Project
        </legend>
        <div className="space-y-fluid-m">
          {techObj?.slice(0, numOfSkills)?.map((tech, idx) => (
            <SkillsCard
              key={idx}
              logo={tech?.logo}
              name={tech?.name}
              level={null}
            />
          ))}
        </div>
        {numOfSkills !== techObj?.length && (
          <button
            onClick={handelShowAll}
            className="btn-third absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
          >
            Show All
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default ProjectSkills;
