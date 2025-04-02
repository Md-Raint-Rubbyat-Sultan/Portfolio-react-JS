import React from "react";
import Themes from "../../../../Constants/Themes";
import toCapital from "../../../../Constants/toCapital";
import { MdCancelPresentation } from "react-icons/md";
import useThemeContext from "../../../../CustomHooks/useThemeContext/useThemeContext";

const NavThemeButton = ({ toggle, setToggle }) => {
  const { setTheme } = useThemeContext();

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
      <div className="max-h-80 relative">
        <div className="flex justify-between items-center gap-fluid mb-fluid-m text-fluid-m">
          <p className="text-third">Select Theme</p>
          <MdCancelPresentation
            onClick={() => setToggle((prev) => !prev)}
            className="cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-fluid mb-fluid">
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
