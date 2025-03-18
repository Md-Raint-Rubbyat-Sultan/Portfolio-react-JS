import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RouterDom from "./routes/RouterDom";
import OpeningAnimation from "./OpeningAnimation";
import ThemeContext from "./contextApis/ThemeContext/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContext>
      <BrowserRouter>
        {/* <OpeningAnimation /> */}
        <RouterDom />
      </BrowserRouter>
    </ThemeContext>
  </React.StrictMode>
);
