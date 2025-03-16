import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ProjectDetails from "../pages/Home/ProjectDetails/ProjectDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Loading from "../components/shared/Loading/Loading";

const RouterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/details/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProjectDetails />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouterDom;
