import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "./i18n.ts";
import ScrollToTop from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </StrictMode>
);
