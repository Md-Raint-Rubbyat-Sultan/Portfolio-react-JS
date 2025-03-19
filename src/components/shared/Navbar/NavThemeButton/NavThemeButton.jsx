import React, { useContext } from "react";

import { ThemeProvider } from "../../../../contextApis/ThemeContext/ThemeContext";
import Themes from "../../../../Constants/Themes";

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
  );
};

export default NavThemeButton;
