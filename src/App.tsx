// src/App.tsx
import { type JSX, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ThreeColumnLayout from "@components/Layout/ThreeColumnLayout";
import NotFound from "@pages/NotFound";

import { ROUTES } from "./constants";

import "@styles/App.css";

// const Home = lazy(() => import("@pages/Home"));
// const SavedPalettes = lazy(() => import("@pages/SavedPalettes"));
// const Accessibility = lazy(() => import("@pages/Accessibility"));
// const ExtractColors = lazy(() => import("@pages/ExtractColors"));
// const About = lazy(() => import("@pages/About"));

// Create a browser router
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ThreeColumnLayout />,
    errorElement: <NotFound />,
  },
  // {
  //   children: [
  //     { index: true, element: <Home /> },
  //     {
  //       path: ROUTES.SAVED_PALETTES,
  //       element: <SavedPalettes />,
  //     },
  //     {
  //       path: ROUTES.ACCESSIBILITY,
  //       element: <Accessibility />,
  //     },
  //     {
  //       path: ROUTES.EXTRACT_COLORS,
  //       element: <ExtractColors />,
  //     },
  //     {
  //       path: ROUTES.ABOUT,
  //       element: <About />,
  //     },
  //   ],
  // },
]);

/**
 * The main App component that renders the application.
 */
export default function App(): JSX.Element {
  return (
    <>
      {/* Render toast notifications */}
      <Toaster />
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
