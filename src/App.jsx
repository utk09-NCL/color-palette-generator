// src/App.jsx
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./styles/App.css";
import Layout from "./components/Layout/Layout";
import Footer from "./components/footer";

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
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className="App">
      {/* Render toast notifications */}
      <Toaster />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
