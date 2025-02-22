import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ProjectDetails from "../pages/Home/ProjectDetails/ProjectDetails";

const RouterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};

export default RouterDom;
