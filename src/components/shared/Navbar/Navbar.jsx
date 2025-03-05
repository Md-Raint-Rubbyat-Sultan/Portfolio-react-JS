import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [showFixedNav, setShowFixedNav] = useState(false);
  const navRef = useRef(null);

  // handle Scroller
  const handleScroll = useCallback(() => {
    const navbar = navRef?.current;
    if (!navRef) return;

    const navbarHeight = navbar.offsetHeight;
    const scrollTop = window.scrollY;
    const navbarBottom = navbar.offsetTop + navbarHeight;

    // Show fixed nav when navbar is out of the viewport
    setShowFixedNav(scrollTop > navbarBottom);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // check if the link is active or not
  const activeLinks = ({ isActive }) =>
    isActive ? "text-second underline" : "text-third";

  return (
    <header>
      {/* Main Navbar (not fixed) */}
      <nav
        ref={navRef}
        className="flex flex-wrap justify-center items-center gap-fluid-l py-fluid-xs text-fluid-xs font-semibold"
      >
        {/* home */}
        <NavLink to="/" className={activeLinks}>
          Home
        </NavLink>
        {/* about */}
        <NavLink to="/about" className={activeLinks}>
          About
        </NavLink>
      </nav>

      {/* Fixed Nav (appears from the top when navbar is 80% out of the viewport) */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl text-center text-fluid font-medium  bg-final p-fluid transition-transform duration-500 z-50 ${
          showFixedNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        Portfolio
      </div>
    </header>
  );
};

export default Navbar;
