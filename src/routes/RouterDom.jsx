import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/main/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import ProjectDetails from "../pages/Home/ProjectDetails/ProjectDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Loading from "../components/shared/Loading/Loading";
import PrivetRoute from "./PrivetRoute";
import AuthLayout from "../layout/auth/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyEmail from "../pages/VerifyEmail/verifyEmail";

const RouterDom = () => {
  return (
    <Routes>
      {/* main layout */}
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
              <PrivetRoute>
                <ProjectDetails />
              </PrivetRoute>
            </Suspense>
          }
        />
      </Route>
      {/* auth layout */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
      </Route>
      {/* error page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouterDom;
