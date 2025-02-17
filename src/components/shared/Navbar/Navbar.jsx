import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  // check if the link is active or not
  const activeLinks = ({ isActive }) =>
    isActive ? "text-second underline" : "text-third";

  return (
    <nav className="flex flex-wrap justify-center items-center gap-fluid-l py-fluid-xs text-fluid-xs font-semibold">
      {/* home */}
      <NavLink to="/" className={activeLinks}>
        Home
      </NavLink>
      {/* about */}
      <NavLink to="/about" className={activeLinks}>
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
