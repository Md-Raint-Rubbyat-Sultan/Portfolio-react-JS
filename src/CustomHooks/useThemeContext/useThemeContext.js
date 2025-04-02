import { useContext } from "react";
import { ThemeContext } from "../../contextApis/ThemeContext/ThemeContext";

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default useThemeContext;
