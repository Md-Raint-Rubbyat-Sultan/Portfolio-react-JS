import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(localStorage.getItem("theme"));

const ThemeProvider = ({ children }) => {
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

  const themeInfo = { setTheme };
  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
