import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import RouterDom from "./routes/RouterDom";
import OpeningAnimation from "./OpeningAnimation";
import ThemeContext from "./contextApis/ThemeContext/ThemeContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContext>
        <BrowserRouter>
          {/* <OpeningAnimation /> */}
          <RouterDom />
          <Toaster />
        </BrowserRouter>
      </ThemeContext>
    </QueryClientProvider>
  </React.StrictMode>
);
