import React from "react";
import Skills from "./Skills";
import ProjectSkills from "./ProjectSkills";

const SkillsCard = () => {
  return (
    <section className="grid md:grid-cols-2 gap-fluid-m md:gap-fluid-l">
      <Skills />
      <ProjectSkills />
    </section>
  );
};

export default SkillsCard;
