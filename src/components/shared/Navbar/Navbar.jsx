import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router";
import Themes from "../../../Constants/Themes";
import { ThemeProvider } from "../../../contextApis/ThemeContext/ThemeContext";

const Navbar = () => {
  // themes
  const themes = Themes;

  const [showFixedNav, setShowFixedNav] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navRef = useRef(null);
  const { setTheme } = useContext(ThemeProvider);

  // handle theme toggle
  const handelThemeToggle = () => {
    setToggle((prev) => !prev);
  };

  // handel set the theme
  const handelTheme = (themeName) => {
    setTheme(themeName);
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
        <button
          onClick={handelThemeToggle}
          className={`${toggle ? "text-second" : "text-third "} cursor-pointer`}
        >
          Themes
        </button>
        <div>
          <div
            className={`absolute top-[100%]  bg-final p-fluid rounded border-2 border-prime grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-fluid z-40 ${
              toggle ? "left-[5%]" : "-left-[100%]"
            } transition-all delay-300`}
          >
            {themes?.map((theme) => (
              <button
                key={theme?.name}
                onClick={() => handelTheme(theme.name)}
                style={{
                  color: `${theme.textClr}`,
                  backgroundColor: `${theme.bgClr}`,
                }}
                className="text-fluid-xs py-fluid-xs px-fluid border-2 border-prime rounded cursor-pointer"
              >
                {theme?.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Fixed Nav (appears from the top when navbar is 80% out of the viewport) */}
      <nav
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl text-center text-fluid font-medium  bg-final p-fluid transition-transform duration-500 z-50 ${
          showFixedNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        Portfolio
      </nav>
    </header>
  );
};

export default Navbar;
