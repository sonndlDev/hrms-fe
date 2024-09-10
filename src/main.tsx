// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import useDarkMode from "./hooks/useDarkMode.js";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import "./css/style.css";
import "./css/satoshi.css";

const Root = () => {
  const { theme } = useDarkMode();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  );
};
createRoot(document.getElementById("root")!).render(<Root />);
