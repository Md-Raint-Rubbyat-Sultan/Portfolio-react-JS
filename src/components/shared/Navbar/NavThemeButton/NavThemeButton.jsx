import React, { useContext } from "react";

import { ThemeProvider } from "../../../../contextApis/ThemeContext/ThemeContext";
import Themes from "../../../../Constants/Themes";
import toCapital from "../../../../Constants/toCapital";
import { MdCancelPresentation } from "react-icons/md";

const NavThemeButton = ({ toggle, setToggle }) => {
  // themes
  const themes = Themes;
  const { setTheme } = useContext(ThemeProvider);
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
          {themes?.map((theme) => (
            <button
              key={theme?.name}
              onClick={() => handelTheme(theme.name)}
              style={{
                color: `${theme.textClr}`,
                backgroundColor: `${theme.bgClr}`,
              }}
              className="text-fluid-xs py-fluid-xs px-fluid w-fi border-2 border-prime rounded cursor-pointer"
            >
              {theme?.name.split("-").map((nm) => toCapital(nm) + " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavThemeButton;
