import React from "react";
import MySkills from "./MySkills";
import ProjectSkills from "./ProjectSkills";

const Skills = () => {
  return (
    <section className="grid md:grid-cols-2 gap-fluid-m md:gap-fluid-l mb-fluid-l">
      <MySkills />
      <ProjectSkills />
    </section>
  );
};

export default Skills;
