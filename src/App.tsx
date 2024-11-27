// src/App.tsx
import { type ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@components/Layout/Layout";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";

import "@styles/App.css";

// Create a browser router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        id: "not-found",
        path: "*",
        element: <NotFound />,
      },
      // Add more routes here as needed
    ],
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
