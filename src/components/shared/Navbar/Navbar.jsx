import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import NavThemeButton from "./NavThemeButton/NavThemeButton";
import OnScrollNav from "./OnScrollNav/OnScrollNav";
import { FaHome, FaTasks } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";

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
          <div className="flex items-center gap-fluid-xs">
            <FaHome />
            <span>Home</span>
          </div>
        </NavLink>
        {/* about */}
        <NavLink to="/about" className={activeLinks}>
          <div className="flex items-center gap-fluid-xs">
            <FaTasks />
            <span>About</span>
          </div>
        </NavLink>
        {/* theme */}
        <div>
          <button
            onClick={handelThemeToggle}
            className={`${
              toggle ? "text-second" : "text-third "
            } flex items-center gap-fluid-xs cursor-pointer`}
          >
            <IoMdColorPalette />
            <span className={`${toggle && "underline"}`}>Themes</span>
          </button>
        </div>
        <NavThemeButton toggle={toggle} setToggle={setToggle} />
      </nav>

      {/* Fixed Nav (appears from the top when navbar is 80% out of the viewport) */}
      <OnScrollNav showFixedNav={showFixedNav} />
    </header>
  );
};

export default Navbar;
