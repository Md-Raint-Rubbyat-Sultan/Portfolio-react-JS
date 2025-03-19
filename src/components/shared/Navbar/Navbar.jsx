import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import NavThemeButton from "./NavThemeButton/NavThemeButton";
import OnScrollNav from "./OnScrollNav/OnScrollNav";

const Navbar = () => {
  const [showFixedNav, setShowFixedNav] = useState(false);
  const navRef = useRef(null);

  // handle theme toggle
  const [toggle, setToggle] = useState(false);
  const handelThemeToggle = () => {
    setToggle((prev) => !prev);
  };

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
    <header className="relative">
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
        {/* theme */}
        <button
          onClick={handelThemeToggle}
          className={`${toggle ? "text-second" : "text-third "} cursor-pointer`}
        >
          Themes
        </button>
        <NavThemeButton toggle={toggle} setToggle={setToggle} />
      </nav>

      {/* Fixed Nav (appears from the top when navbar is 80% out of the viewport) */}
      <OnScrollNav showFixedNav={showFixedNav} />
    </header>
  );
};

export default Navbar;
