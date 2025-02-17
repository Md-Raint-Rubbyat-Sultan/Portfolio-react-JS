import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import OpeningAnimation from "../../components/Home/OpeningAnimation/OpeningAnimation";

const MainLayout = () => {
  return (
    <main className="site-view">
      <OpeningAnimation />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
