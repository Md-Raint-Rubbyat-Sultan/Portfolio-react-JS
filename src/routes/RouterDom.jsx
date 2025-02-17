import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";

const RouterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default RouterDom;
