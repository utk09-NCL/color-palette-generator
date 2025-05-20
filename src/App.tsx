// src/App.tsx
import { type JSX, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SimpleLayout from "@components/Layout/SimpleLayout";
import ThreeColumnLayout from "@components/Layout/ThreeColumnLayout";
import { Spinner } from "@components/Shared/Spinner";
import NotFound from "@pages/NotFound";

import { ROUTES } from "@/constants";

import "./styles/App.css";

const SavedPalettes = lazy(() => import("@pages/SavedPalettes"));
const Accessibility = lazy(() => import("@pages/Accessibility"));
const ExtractColors = lazy(() => import("@pages/ExtractColors"));
const About = lazy(() => import("@pages/About"));

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTES.HOME,
        index: true,
        element: <ThreeColumnLayout />,
      },
      {
        path: ROUTES.SAVED_PALETTES,
        element: (
          <SimpleLayout>
            <SavedPalettes />
          </SimpleLayout>
        ),
      },
      {
        path: ROUTES.ACCESSIBILITY,
        element: (
          <SimpleLayout>
            <Accessibility />
          </SimpleLayout>
        ),
      },
      {
        path: ROUTES.EXTRACT_COLORS,
        element: (
          <SimpleLayout>
            <ExtractColors />
          </SimpleLayout>
        ),
      },
      {
        path: ROUTES.ABOUT,
        element: (
          <SimpleLayout>
            <About />
          </SimpleLayout>
        ),
      },
    ],
  },
]);

/**
 * The main App component that renders the application.
 */
export default function App(): JSX.Element {
  return (
    <>
      {/* Render toast notifications */}
      <Toaster />
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
