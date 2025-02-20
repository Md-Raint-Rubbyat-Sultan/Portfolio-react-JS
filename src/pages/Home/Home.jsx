import React from "react";
import Banner from "../../components/Home/Banner/Banner";
import Skills from "../../components/Home/SkillsCard/Skills";
import MyProjects from "../../components/Home/Projects/MyProjects";

const Home = () => {
  return (
    <div>
      <Banner />
      <Skills />
      <MyProjects />
    </div>
  );
};

export default Home;
