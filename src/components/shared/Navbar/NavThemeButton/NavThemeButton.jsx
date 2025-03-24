import React, { useEffect, useState } from "react";
import Themes from "../../../../Constants/Themes";
import toCapital from "../../../../Constants/toCapital";
import { MdCancelPresentation } from "react-icons/md";

const NavThemeButton = ({ toggle, setToggle }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme"));

  useEffect(() => {
    localStorage.setItem("theme", theme || "gray-sheet");

    const selectTheme = localStorage.getItem("theme");

    if (selectTheme) {
      document.body.setAttribute("data-theme", selectTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // themes
  const themes = Themes;
  // handel set the theme
  const handelTheme = (themeName) => {
    setTheme(themeName);
    setToggle((prev) => !prev);
  };

  return (
    <div
      className={`absolute top-[100%]  bg-final p-fluid rounded border-2 border-prime ${
        toggle ? "left-[5%]" : "-left-[100%]"
      } transition-all overflow-y-auto z-40`}
    >
      {/* flex flex-row-reverse justify-start items-start gap-fluid  */}
      <div className="max-h-80 relative">
        <div className="flex justify-between items-center mb-fluid-m text-fluid-m">
          <p className="text-third">Select Theme</p>
          <MdCancelPresentation
            onClick={() => setToggle((prev) => !prev)}
            className="cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-fluid">
          {themes?.map((thm) => (
            <button
              key={thm?.name}
              onClick={() => handelTheme(thm.name)}
              style={{
                color: `${thm.textClr}`,
                backgroundColor: `${thm.bgClr}`,
              }}
              className="text-fluid-xs py-fluid-xs px-fluid w-fi border-2 border-prime rounded cursor-pointer"
            >
              {thm?.name.split("-").map((nm) => toCapital(nm) + " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavThemeButton;
