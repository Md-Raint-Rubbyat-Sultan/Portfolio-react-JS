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
import Tooltip from "../Tooltip/Tooltip";

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
  const activeProfileLinks = ({ isActive }) =>
    isActive
      ? "border-2 border-second-semi rounded-full"
      : "border-2 border-third-semi rounded-full";

  return (
    <header className="relative">
      {/* Main Navbar (not fixed) */}
      <nav
        ref={navRef}
        className="flex flex-wrap justify-center items-center gap-fluid-l py-fluid-xs"
      >
        {/* home */}
        <NavLink to="/" className={activeLinks}>
          <Tooltip tip={"Home"}>
            <FaHome className="text-fluid font-semibold" />
          </Tooltip>
        </NavLink>
        {/* about */}
        <NavLink to="/about" className={activeLinks}>
          <Tooltip tip={"About"}>
            <FaTasks className="text-fluid font-semibold" />
          </Tooltip>
        </NavLink>
        {/* theme */}
        <div>
          <Tooltip tip={"Themes"}>
            <button
              onClick={handelThemeToggle}
              className={`${
                toggle ? "text-second" : "text-third "
              } flex items-center gap-fluid-xs cursor-pointer`}
            >
              <IoMdColorPalette className="text-fluid font-semibold" />
              {/* <span className={`${toggle && "underline"}`}>Themes</span> */}
            </button>
          </Tooltip>
        </div>
        <NavThemeButton toggle={toggle} setToggle={setToggle} />
        {user ? (
          <>
            {/* logout */}
            <div>
              <Tooltip tip={"Logout"}>
                <button
                  onClick={() => handleLogout()}
                  className={
                    "text-third focus:text-second focus:underline cursor-pointer"
                  }
                >
                  <MdLogout className="text-fluid font-semibold" />
                </button>
              </Tooltip>
            </div>
            {/* profile */}
            <NavLink to="/profile" className={activeProfileLinks}>
              <Tooltip tip={"Profile"}>
                <img
                  src={user?.profilePic?.url}
                  alt="profile"
                  className="w-fluid-m h-fluid-m rounded-full"
                />
              </Tooltip>
            </NavLink>
          </>
        ) : (
          <>
            {/* Login */}
            <NavLink to="/auth/login" className={activeLinks}>
              <Tooltip tip={"Login"}>
                <FiLogIn className="text-fluid font-semibold" />
              </Tooltip>
            </NavLink>
            {/* Register */}
            <NavLink to="/auth/register" className={activeLinks}>
              <Tooltip tip={"Register"}>
                <IoMdCreate className="text-fluid font-semibold" />
              </Tooltip>
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
