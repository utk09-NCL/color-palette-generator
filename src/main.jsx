import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {ThemeProvider} from "./components/theme-provider";

//Wrapping the App component with the ThemeProvider component so that its can reflect everywhere on the code   with the App component acting as the children
createRoot(document.getElementById("root")).render(
  <StrictMode>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> 
      <App />
     </ThemeProvider> 
  </StrictMode>,
);
