import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import ScrollToTopButton from "../../components/shared/ScrollToTopButton/ScrollToTopButton";

const MainLayout = () => {
  return (
    <main className="site-view">
      <ScrollToTopButton />
      <Navbar />
      <div className="px-fluid">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
