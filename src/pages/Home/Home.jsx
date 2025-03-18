import React from "react";
import Banner from "../../components/Home/Banner/Banner";
import Skills from "../../components/Home/SkillsCard/Skills";
import MyProjects from "../../components/Home/Projects/MyProjects";

const Home = () => {
  return (
    <section>
      <Banner />
      <Skills />
      <MyProjects />
    </section>
  );
};

export default Home;
