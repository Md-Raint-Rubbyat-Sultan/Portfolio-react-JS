import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <main className="site-view">
      <Navbar />
      <div className="px-fluid">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
