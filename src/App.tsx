// src/App.tsx
import { type ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThreeColumnLayout from "@components/Layout/ThreeColumnLayout";
import NotFound from "@pages/NotFound";

import "@styles/App.css";

// Create a browser router
const router = createBrowserRouter([
  {
    path: "/",
    element: <ThreeColumnLayout />,
    errorElement: <NotFound />,
  },
]);

/**
 * The main App component that renders the application.
 *
 * @returns {ReactElement} The rendered application.
 */
function App(): ReactElement {
  return (
    <div className="App">
      {/* Render toast notifications */}
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
