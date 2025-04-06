import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import NavThemeButton from "./NavThemeButton/NavThemeButton";
import OnScrollNav from "./OnScrollNav/OnScrollNav";
import useAuthContext from "../../../CustomHooks/useAuthContext/useAuthContext";
import { FaHome, FaTasks } from "react-icons/fa";
import { IoMdColorPalette, IoMdCreate } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { user, refetch, logout } = useAuthContext();
  const [showFixedNav, setShowFixedNav] = useState(false);
  const navRef = useRef(null);
  const queryClient = useQueryClient();

  // handle theme toggle
  const [toggle, setToggle] = useState(false);
  const handelThemeToggle = () => {
    setToggle((prev) => !prev);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        queryClient.removeQueries(["auth-user"]);
        await refetch();
      }
    } catch (error) {
      console.log(error);
    }
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
        {user ? (
          // logout
          <div>
            <button
              onClick={() => handleLogout()}
              className={
                "flex items-center gap-fluid-xs text-third focus:text-second focus:underline cursor-pointer"
              }
            >
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
            {/* Login */}
            <NavLink to="/auth/login" className={activeLinks}>
              <div className="flex items-center gap-fluid-xs">
                <FiLogIn />
                <span>Login</span>
              </div>
            </NavLink>
            {/* Register */}
            <NavLink to="/auth/register" className={activeLinks}>
              <div className="flex items-center gap-fluid-xs">
                <IoMdCreate />
                <span>Sign Up</span>
              </div>
            </NavLink>
          </>
        )}
      </nav>

      {/* Fixed Nav (appears from the top when navbar is 80% out of the viewport) */}
      <OnScrollNav showFixedNav={showFixedNav} />
    </header>
  );
};

export default Navbar;
