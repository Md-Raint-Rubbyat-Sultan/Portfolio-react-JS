import React from "react";
import Footer from "../../components/shared/Footer/Footer";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="site-view">
      <div className="px-fluid">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
