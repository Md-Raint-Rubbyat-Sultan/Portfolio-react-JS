import React from "react";
import projectSkillsDB from "/public/db/projectSkillsDB.js";

const ProjectSkills = () => {
  return (
    <div className="order-1 md:order-2">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid text-wrap font-semibold">
          Skills Used In This Project
        </legend>
        {/* add skills */}
        <div>
          {projectSkillsDB.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-fluid-l my-fluid">
              <div className="w-fluid-xl h-fluid-xl rounded-full overflow-hidden">
                <img
                  src={skill?.logo}
                  alt={skill?.name}
                  className="object-contain h-full"
                />
              </div>
              <p className="text-fluid font-semibold">{skill?.name}</p>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ProjectSkills;
