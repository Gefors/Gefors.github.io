import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AlgorithmsContext } from "./components/AlgorithmsComponents/utils/AlgorithmsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlgorithmsContext>
      <App />
    </AlgorithmsContext>
  </StrictMode>
);
