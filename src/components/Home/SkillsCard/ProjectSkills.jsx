import React from "react";
import SkillsCard from "./SkillsCard";
import { projectSkillsDB } from "/public/db/projectSkillsDB.js";

const ProjectSkills = () => {
  return (
    <div className="order-1 md:order-2">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid text-wrap font-semibold">
          Skills Used In This Project
        </legend>
        <div className="space-y-fluid-m">
          {projectSkillsDB.map((skill, idx) => (
            <SkillsCard
              key={idx}
              logo={skill?.logo}
              name={skill?.name}
              level={skill?.level ? skill?.level : null}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ProjectSkills;
